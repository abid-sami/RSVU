"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import {
  AdminComponent,
  AdminBorrowing,
  AdminEvent,
  AdminMember,
  AdminAchievement,
  AdminGalleryImage,
  AdminGalleryCategory,
  AdminCountdown,
  DashboardStats,
} from "@/lib/adminTypes";
import { galleryItems } from "@/data/galleryData";

// =============================================
// Admin Data Context — localStorage CRUD
// Replace localStorage calls with Supabase later
// =============================================

// Storage keys
const KEYS = {
  components: "rsvu_admin_components",
  borrowings: "rsvu_admin_borrowings",
  events: "rsvu_admin_events",
  members: "rsvu_admin_members",
  achievements: "rsvu_admin_achievements",
  galleryImages: "rsvu_admin_gallery_images",
  galleryCategories: "rsvu_admin_gallery_categories",
  countdown: "rsvu_admin_countdown",
};

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function getFromStorage<T>(key: string, fallback: T[]): T[] {
  try {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
  } catch { /* ignore */ }
  return fallback;
}

function saveToStorage<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch { /* ignore */ }
}

function getObjectFromStorage<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
  } catch { /* ignore */ }
  return fallback;
}

function saveObjectToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch { /* ignore */ }
}

// Default countdown
const DEFAULT_COUNTDOWN: AdminCountdown = {
  isEnabled: true,
  eventName: "ROBOSPARK 2026 : NATIONAL ROBOTICS FIESTA",
  eventDate: "2026-11-28T09:00:00+06:00",
};

// Default gallery categories
const DEFAULT_GALLERY_CATEGORIES: AdminGalleryCategory[] = [
  { id: "cat-competitions", name: "Competitions" },
  { id: "cat-workshops", name: "Workshops" },
  { id: "cat-hardware", name: "Hardware Labs" },
  { id: "cat-team", name: "Team & Events" },
];

// Default gallery images from galleryData (first 6 pinned)
const DEFAULT_GALLERY_IMAGES: AdminGalleryImage[] = galleryItems.map((item) => ({
  id: item.id,
  title: item.title,
  categoryId: item.category === "Competitions" ? "cat-competitions" : item.category === "Workshops" ? "cat-workshops" : item.category === "Hardware Labs" ? "cat-hardware" : "cat-team",
  categoryName: item.category,
  image: item.image,
  caption: item.caption,
  isPinned: item.isPinned ?? false,
  createdAt: new Date().toISOString(),
}));

// ---------- Context Type ----------
interface AdminDataContextType {
  // Components
  components: AdminComponent[];
  addComponent: (data: Omit<AdminComponent, "id" | "createdAt" | "availableQuantity">) => void;
  updateComponent: (id: string, data: Partial<AdminComponent>) => void;
  deleteComponent: (id: string) => void;

  // Borrowings
  borrowings: AdminBorrowing[];
  addBorrowing: (data: Omit<AdminBorrowing, "id" | "status" | "returnedDate">) => void;
  returnBorrowing: (id: string) => void;

  // Events
  events: AdminEvent[];
  addEvent: (data: Omit<AdminEvent, "id" | "createdAt">) => void;
  updateEvent: (id: string, data: Partial<AdminEvent>) => void;
  deleteEvent: (id: string) => void;

  // Countdown
  countdown: AdminCountdown;
  updateCountdown: (data: AdminCountdown) => void;

  // Members
  members: AdminMember[];
  addMember: (data: Omit<AdminMember, "id" | "createdAt">) => void;
  updateMember: (id: string, data: Partial<AdminMember>) => void;
  deleteMember: (id: string) => void;

  // Achievements
  achievements: AdminAchievement[];
  addAchievement: (data: Omit<AdminAchievement, "id" | "createdAt">) => void;
  updateAchievement: (id: string, data: Partial<AdminAchievement>) => void;
  deleteAchievement: (id: string) => void;

  // Gallery
  galleryImages: AdminGalleryImage[];
  galleryCategories: AdminGalleryCategory[];
  addGalleryImage: (data: Omit<AdminGalleryImage, "id" | "createdAt">) => void;
  updateGalleryImage: (id: string, data: Partial<AdminGalleryImage>) => void;
  deleteGalleryImage: (id: string) => void;
  togglePinGalleryImage: (id: string) => void;
  addGalleryCategory: (name: string) => void;
  updateGalleryCategory: (id: string, name: string) => void;
  deleteGalleryCategory: (id: string) => void;

  // Stats
  getStats: () => DashboardStats;

  // Toast
  toast: { message: string; type: "success" | "error" } | null;
  showToast: (message: string, type: "success" | "error") => void;
  clearToast: () => void;
}

const AdminDataContext = createContext<AdminDataContextType | null>(null);

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [components, setComponents] = useState<AdminComponent[]>([]);
  const [borrowings, setBorrowings] = useState<AdminBorrowing[]>([]);
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [members, setMembers] = useState<AdminMember[]>([]);
  const [achievements, setAchievements] = useState<AdminAchievement[]>([]);
  const [galleryImages, setGalleryImages] = useState<AdminGalleryImage[]>([]);
  const [galleryCategories, setGalleryCategories] = useState<AdminGalleryCategory[]>([]);
  const [countdown, setCountdown] = useState<AdminCountdown>(DEFAULT_COUNTDOWN);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    setComponents(getFromStorage<AdminComponent>(KEYS.components, []));
    setBorrowings(getFromStorage<AdminBorrowing>(KEYS.borrowings, []));
    setEvents(getFromStorage<AdminEvent>(KEYS.events, []));
    setMembers(getFromStorage<AdminMember>(KEYS.members, []));
    setAchievements(getFromStorage<AdminAchievement>(KEYS.achievements, []));
    setGalleryImages(getFromStorage<AdminGalleryImage>(KEYS.galleryImages, DEFAULT_GALLERY_IMAGES));
    setGalleryCategories(getFromStorage<AdminGalleryCategory>(KEYS.galleryCategories, DEFAULT_GALLERY_CATEGORIES));
    setCountdown(getObjectFromStorage<AdminCountdown>(KEYS.countdown, DEFAULT_COUNTDOWN));
  }, []);

  // Toast helpers
  const showToast = useCallback((message: string, type: "success" | "error") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, type });
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  }, []);

  const clearToast = useCallback(() => setToast(null), []);

  // ---- Components CRUD ----
  const addComponent = useCallback((data: Omit<AdminComponent, "id" | "createdAt" | "availableQuantity">) => {
    setComponents((prev) => {
      const item: AdminComponent = {
        ...data,
        id: generateId(),
        availableQuantity: data.quantity,
        createdAt: new Date().toISOString(),
      };
      const next = [...prev, item];
      saveToStorage(KEYS.components, next);
      return next;
    });
    showToast("Component added successfully", "success");
  }, [showToast]);

  const updateComponent = useCallback((id: string, data: Partial<AdminComponent>) => {
    setComponents((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, ...data } : c));
      saveToStorage(KEYS.components, next);
      return next;
    });
    showToast("Component updated successfully", "success");
  }, [showToast]);

  const deleteComponent = useCallback((id: string) => {
    setComponents((prev) => {
      const next = prev.filter((c) => c.id !== id);
      saveToStorage(KEYS.components, next);
      return next;
    });
    showToast("Component deleted", "success");
  }, [showToast]);

  // ---- Borrowings ----
  const addBorrowing = useCallback((data: Omit<AdminBorrowing, "id" | "status" | "returnedDate">) => {
    const borrowing: AdminBorrowing = { ...data, id: generateId(), status: "borrowed" };
    setBorrowings((prev) => {
      const next = [...prev, borrowing];
      saveToStorage(KEYS.borrowings, next);
      return next;
    });
    // Decrement available quantity
    setComponents((prev) => {
      const next = prev.map((c) =>
        c.id === data.componentId
          ? { ...c, availableQuantity: Math.max(0, c.availableQuantity - 1) }
          : c
      );
      saveToStorage(KEYS.components, next);
      return next;
    });
    showToast("Component given successfully", "success");
  }, [showToast]);

  const returnBorrowing = useCallback((id: string) => {
    let componentId = "";
    setBorrowings((prev) => {
      const next = prev.map((b) => {
        if (b.id === id) {
          componentId = b.componentId;
          return { ...b, status: "returned" as const, returnedDate: new Date().toISOString() };
        }
        return b;
      });
      saveToStorage(KEYS.borrowings, next);
      return next;
    });
    if (componentId) {
      setComponents((prev) => {
        const next = prev.map((c) =>
          c.id === componentId
            ? { ...c, availableQuantity: Math.min(c.quantity, c.availableQuantity + 1) }
            : c
        );
        saveToStorage(KEYS.components, next);
        return next;
      });
    }
    showToast("Component returned successfully", "success");
  }, [showToast]);

  // ---- Events CRUD ----
  const addEvent = useCallback((data: Omit<AdminEvent, "id" | "createdAt">) => {
    setEvents((prev) => {
      const item: AdminEvent = { ...data, id: generateId(), createdAt: new Date().toISOString() };
      const next = [...prev, item];
      saveToStorage(KEYS.events, next);
      return next;
    });
    showToast("Event added successfully", "success");
  }, [showToast]);

  const updateEvent = useCallback((id: string, data: Partial<AdminEvent>) => {
    setEvents((prev) => {
      const next = prev.map((e) => (e.id === id ? { ...e, ...data } : e));
      saveToStorage(KEYS.events, next);
      return next;
    });
    showToast("Event updated successfully", "success");
  }, [showToast]);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => {
      const next = prev.filter((e) => e.id !== id);
      saveToStorage(KEYS.events, next);
      return next;
    });
    showToast("Event deleted", "success");
  }, [showToast]);

  // ---- Countdown ----
  const updateCountdown = useCallback((data: AdminCountdown) => {
    setCountdown(data);
    saveObjectToStorage(KEYS.countdown, data);
    showToast("Countdown settings updated", "success");
  }, [showToast]);

  // ---- Members CRUD ----
  const addMember = useCallback((data: Omit<AdminMember, "id" | "createdAt">) => {
    setMembers((prev) => {
      const item: AdminMember = { ...data, id: generateId(), createdAt: new Date().toISOString() };
      const next = [...prev, item];
      saveToStorage(KEYS.members, next);
      return next;
    });
    showToast("Member added successfully", "success");
  }, [showToast]);

  const updateMember = useCallback((id: string, data: Partial<AdminMember>) => {
    setMembers((prev) => {
      const next = prev.map((m) => (m.id === id ? { ...m, ...data } : m));
      saveToStorage(KEYS.members, next);
      return next;
    });
    showToast("Member updated successfully", "success");
  }, [showToast]);

  const deleteMember = useCallback((id: string) => {
    setMembers((prev) => {
      const next = prev.filter((m) => m.id !== id);
      saveToStorage(KEYS.members, next);
      return next;
    });
    showToast("Member deleted", "success");
  }, [showToast]);

  // ---- Achievements CRUD ----
  const addAchievement = useCallback((data: Omit<AdminAchievement, "id" | "createdAt">) => {
    setAchievements((prev) => {
      const item: AdminAchievement = { ...data, id: generateId(), createdAt: new Date().toISOString() };
      const next = [...prev, item];
      saveToStorage(KEYS.achievements, next);
      return next;
    });
    showToast("Achievement added successfully", "success");
  }, [showToast]);

  const updateAchievement = useCallback((id: string, data: Partial<AdminAchievement>) => {
    setAchievements((prev) => {
      const next = prev.map((a) => (a.id === id ? { ...a, ...data } : a));
      saveToStorage(KEYS.achievements, next);
      return next;
    });
    showToast("Achievement updated successfully", "success");
  }, [showToast]);

  const deleteAchievement = useCallback((id: string) => {
    setAchievements((prev) => {
      const next = prev.filter((a) => a.id !== id);
      saveToStorage(KEYS.achievements, next);
      return next;
    });
    showToast("Achievement deleted", "success");
  }, [showToast]);

  // ---- Gallery CRUD ----
  const addGalleryImage = useCallback((data: Omit<AdminGalleryImage, "id" | "createdAt">) => {
    setGalleryImages((prev) => {
      const item: AdminGalleryImage = { ...data, id: generateId(), createdAt: new Date().toISOString() };
      const next = [...prev, item];
      saveToStorage(KEYS.galleryImages, next);
      return next;
    });
    showToast("Image added to gallery", "success");
  }, [showToast]);

  const updateGalleryImage = useCallback((id: string, data: Partial<AdminGalleryImage>) => {
    setGalleryImages((prev) => {
      const next = prev.map((g) => (g.id === id ? { ...g, ...data } : g));
      saveToStorage(KEYS.galleryImages, next);
      return next;
    });
    showToast("Gallery image updated", "success");
  }, [showToast]);

  const deleteGalleryImage = useCallback((id: string) => {
    setGalleryImages((prev) => {
      const next = prev.filter((g) => g.id !== id);
      saveToStorage(KEYS.galleryImages, next);
      return next;
    });
    showToast("Gallery image deleted", "success");
  }, [showToast]);

  const togglePinGalleryImage = useCallback((id: string) => {
    setGalleryImages((prev) => {
      const target = prev.find((img) => img.id === id);
      const currentlyPinned = prev.filter((img) => img.isPinned).length;
      if (!target?.isPinned && currentlyPinned >= 6) {
        showToast("Maximum 6 images can be pinned to Homepage", "error");
        return prev;
      }
      const next = prev.map((img) => (img.id === id ? { ...img, isPinned: !img.isPinned } : img));
      saveToStorage(KEYS.galleryImages, next);
      showToast(!target?.isPinned ? "Image pinned to Homepage" : "Image unpinned from Homepage", "success");
      return next;
    });
  }, [showToast]);

  const addGalleryCategory = useCallback((name: string) => {
    setGalleryCategories((prev) => {
      const item: AdminGalleryCategory = { id: generateId(), name };
      const next = [...prev, item];
      saveToStorage(KEYS.galleryCategories, next);
      return next;
    });
    showToast("Category added", "success");
  }, [showToast]);

  const updateGalleryCategory = useCallback((id: string, name: string) => {
    setGalleryCategories((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, name } : c));
      saveToStorage(KEYS.galleryCategories, next);
      return next;
    });
    // Also update categoryName on images
    setGalleryImages((prev) => {
      const next = prev.map((img) => (img.categoryId === id ? { ...img, categoryName: name } : img));
      saveToStorage(KEYS.galleryImages, next);
      return next;
    });
    showToast("Category updated", "success");
  }, [showToast]);

  const deleteGalleryCategory = useCallback((id: string) => {
    setGalleryCategories((prev) => {
      const next = prev.filter((c) => c.id !== id);
      saveToStorage(KEYS.galleryCategories, next);
      return next;
    });
    showToast("Category deleted", "success");
  }, [showToast]);

  // ---- Stats ----
  const getStats = useCallback((): DashboardStats => {
    const activeBorrowings = borrowings.filter((b) => b.status === "borrowed").length;
    return {
      totalComponents: components.length,
      totalComponentsGiven: activeBorrowings,
      totalMembers: members.length,
      totalEvents: events.length,
      totalAchievements: achievements.length,
      totalGalleryImages: galleryImages.length,
    };
  }, [components, borrowings, members, events, achievements, galleryImages]);

  return (
    <AdminDataContext.Provider
      value={{
        components,
        addComponent,
        updateComponent,
        deleteComponent,
        borrowings,
        addBorrowing,
        returnBorrowing,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        countdown,
        updateCountdown,
        members,
        addMember,
        updateMember,
        deleteMember,
        achievements,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        galleryImages,
        galleryCategories,
        addGalleryImage,
        updateGalleryImage,
        deleteGalleryImage,
        togglePinGalleryImage,
        addGalleryCategory,
        updateGalleryCategory,
        deleteGalleryCategory,
        getStats,
        toast,
        showToast,
        clearToast,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error("useAdminData must be used within AdminDataProvider");
  return ctx;
}
