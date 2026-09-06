// =============================================
// Admin Panel — Shared TypeScript Interfaces
// Designed for easy Supabase migration later
// =============================================

// ---------- Components ----------
export interface AdminComponent {
  id: string;
  name: string;
  category: string;
  image: string;
  quantity: number;
  availableQuantity: number;
  createdAt: string;
}

// ---------- Component Borrowing ----------
export type BorrowingStatus = "borrowed" | "returned";

export interface AdminBorrowing {
  id: string;
  borrowerName: string;
  studentId: string;
  semester: number; // 1–8
  section: string; // A–G
  componentId: string;
  componentName: string;
  givenDate: string;
  returnedDate?: string;
  status: BorrowingStatus;
}

// ---------- Events ----------
export type EventCategory = "Running" | "Upcoming" | "Past";

export interface AdminEvent {
  id: string;
  name: string;
  category: EventCategory;
  date: string;
  place: string;
  prizePool: string;
  price?: string;
  registrationLink: string;
  image?: string;
  createdAt: string;
}

// ---------- Countdown ----------
export interface AdminCountdown {
  isEnabled: boolean;
  eventName: string;
  eventDate: string;
}

// ---------- Members ----------
export interface AdminMember {
  id: string;
  name: string;
  designation: string;
  education: string;
  photo: string;
  createdAt: string;
}

// ---------- Achievements ----------
export interface AdminAchievement {
  id: string;
  location: string;
  category: string;
  tournamentName: string;
  details: string;
  teamName: string;
  teamMembers: string[];
  photo: string;
  createdAt: string;
}

// ---------- Gallery ----------
export interface AdminGalleryCategory {
  id: string;
  name: string;
}

export interface AdminGalleryImage {
  id: string;
  title: string;
  categoryId: string;
  categoryName: string;
  image: string; // URL or base64
  caption: string;
  isPinned?: boolean;
  createdAt: string;
}

// ---------- Dashboard Stats ----------
export interface DashboardStats {
  totalComponents: number;
  totalComponentsGiven: number;
  totalMembers: number;
  totalEvents: number;
  totalAchievements: number;
  totalGalleryImages: number;
}
