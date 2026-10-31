import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import LoginAttemptModel from "@/models/LoginAttempt";
import fs from "fs";
import path from "path";

const MAX_ATTEMPTS = 10;
const LOCKOUT_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

function getSecret(key: string, fallback: string): string {
  try {
    const envPath = path.resolve(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const match = content.match(new RegExp(`^${key}=\\s*(.*?)\\s*$`, "m"));
      if (match && match[1]) {
        return match[1].replace(/\r/g, "").replace(/^["']|["']$/g, "").trim();
      }
    }
  } catch {}
  if (process.env[key]) return process.env[key]!.replace(/\r/g, "").trim();
  return fallback;
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { email, password, captchaAnswer, expectedCaptcha } = body;

    const normalizedEmail = (email || "").toLowerCase().trim();

    if (!normalizedEmail || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    // Load or create login attempt record in MongoDB
    let attempt = await LoginAttemptModel.findOne({ identifier: normalizedEmail });
    if (!attempt) {
      attempt = new LoginAttemptModel({ identifier: normalizedEmail, attempts: 0 });
    }

    const now = new Date();

    // 1. Check if user is currently locked out for 24 hours
    if (attempt.lockedUntil && attempt.lockedUntil > now) {
      const msLeft = attempt.lockedUntil.getTime() - now.getTime();
      const hours = Math.floor(msLeft / (1000 * 60 * 60));
      const minutes = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((msLeft % (1000 * 60)) / 1000);

      const timeString =
        hours > 0
          ? `${hours} hour${hours > 1 ? "s" : ""} ${minutes} min`
          : minutes > 0
          ? `${minutes} min ${seconds} sec`
          : `${seconds} seconds`;

      return NextResponse.json(
        {
          success: false,
          isLockedOut: true,
          lockedUntil: attempt.lockedUntil.toISOString(),
          error: `Security Alert: Account blocked for 24 hours due to 10 consecutive failed attempts. Try again in ${timeString}.`,
        },
        { status: 423 }
      );
    }

    // If lockout period has passed, reset attempt counter
    if (attempt.lockedUntil && attempt.lockedUntil <= now) {
      attempt.attempts = 0;
      attempt.lockedUntil = null;
    }

    // 2. Enforce CAPTCHA if failed attempts >= 3
    if (attempt.attempts >= 3 && expectedCaptcha !== undefined) {
      if (!captchaAnswer || String(captchaAnswer).trim() !== String(expectedCaptcha).trim()) {
        attempt.attempts += 1;
        if (attempt.attempts >= MAX_ATTEMPTS) {
          attempt.lockedUntil = new Date(now.getTime() + LOCKOUT_DURATION_MS);
          await attempt.save();
          return NextResponse.json(
            {
              success: false,
              isLockedOut: true,
              lockedUntil: attempt.lockedUntil.toISOString(),
              error: `Security Alert: 10 wrong attempts reached. This account has been blocked for 24 hours.`,
            },
            { status: 423 }
          );
        }
        await attempt.save();
        return NextResponse.json(
          {
            success: false,
            requiresCaptcha: true,
            failedAttempts: attempt.attempts,
            error: `Incorrect CAPTCHA answer. ${MAX_ATTEMPTS - attempt.attempts} attempts remaining before 24-hour block.`,
          },
          { status: 400 }
        );
      }
    }

    // 3. Retrieve secure credentials from server environment
    const adminEmail = getSecret("ADMIN_EMAIL", "admin@rsvu.edu.bd").toLowerCase().trim();
    const adminPassword = getSecret("ADMIN_PASSWORD", "RSVU#MasterAdmin!2026");

    const inventoryEmail = getSecret("INVENTORY_EMAIL", "inventory@rsvu.edu.bd").toLowerCase().trim();
    const inventoryPassword = getSecret("INVENTORY_PASSWORD", "RSVU#LabInventory!2026");

    let role: "admin" | "inventory_manager" | null = null;
    let userName = "";

    if (normalizedEmail === adminEmail && password === adminPassword) {
      role = "admin";
      userName = "System Administrator";
    } else if (normalizedEmail === inventoryEmail && password === inventoryPassword) {
      role = "inventory_manager";
      userName = "Inventory & Lab Manager";
    }

    // 4. Handle failed login
    if (!role) {
      attempt.attempts += 1;
      attempt.lastAttemptAt = now;

      // Check if 10 failed attempts reached -> block for 24 hours!
      if (attempt.attempts >= MAX_ATTEMPTS) {
        attempt.lockedUntil = new Date(now.getTime() + LOCKOUT_DURATION_MS);
        await attempt.save();

        return NextResponse.json(
          {
            success: false,
            isLockedOut: true,
            lockedUntil: attempt.lockedUntil.toISOString(),
            error: `Security Alert: 10 wrong password attempts detected. This account has been blocked for 24 hours.`,
          },
          { status: 423 }
        );
      }

      await attempt.save();
      const remainingAttempts = MAX_ATTEMPTS - attempt.attempts;

      return NextResponse.json(
        {
          success: false,
          failedAttempts: attempt.attempts,
          requiresCaptcha: attempt.attempts >= 3,
          error: `Invalid email or password. ${remainingAttempts} attempt${
            remainingAttempts !== 1 ? "s" : ""
          } remaining before a 24-hour account lockout.`,
        },
        { status: 401 }
      );
    }

    // 5. Successful login -> reset lockout & attempts in MongoDB
    attempt.attempts = 0;
    attempt.lockedUntil = null;
    attempt.lastAttemptAt = now;
    await attempt.save();

    return NextResponse.json({
      success: true,
      user: {
        email: normalizedEmail,
        name: userName,
        role, // "admin" (full access) or "inventory_manager" (Components & Borrowings only)
      },
      message: "Authentication successful.",
    });
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Authentication service failed." },
      { status: 500 }
    );
  }
}
