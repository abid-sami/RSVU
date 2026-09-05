import type { Metadata } from "next";
import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: {
    default: "Robotics Society of Varendra University",
    template: "%s | RSVU",
  },
  description:
    "Official portal of the Robotics Society of Varendra University (RSVU). Learn, Build, Innovate with cutting-edge autonomous rovers, Robo Soccer, LFR, embedded IoT hardware, and national competitions.",
  keywords: [
    "Robotics Society of Varendra University",
    "RSVU",
    "Varendra University",
    "RoboSpark",
    "Line Follower Robot",
    "Robo Soccer",
    "Robotics Club Rajshahi",
    "Bangladesh Robotics",
  ],
  authors: [{ name: "Ragib Hasan Abid Sami" }],
  creator: "Ragib Hasan Abid Sami",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rsvu-robotics.org",
    siteName: "RSVU Robotics",
    title: "RSVU Robotics | Robotics Society of Varendra University",
    description: "Learn. Build. Innovate. The premier university robotics society of northern Bangladesh.",
  },
  icons: {
    icon: [
      { url: "/logo.webp", type: "image/webp" },
      { url: "https://i.ibb.co.com/LD6DpyVB/RSVU.webp", type: "image/webp" },
    ],
    shortcut: "/logo.webp",
    apple: "https://i.ibb.co.com/LD6DpyVB/RSVU.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#06090e] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black antialiased">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
