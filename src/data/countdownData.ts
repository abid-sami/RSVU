export interface CountdownConfig {
  isEnabled: boolean;
  eventTitle: string;
  eventSubtitle: string;
  targetDate: string; // ISO 8601 string or Date parseable
  venue: string;
  registrationOpen: boolean;
  registrationLink?: string;
  detailsLink?: string;
}

// Configured so future admin panel / backend API can simply update this object
export const upcomingEventCountdown: CountdownConfig = {
  isEnabled: true,
  eventTitle: "ROBOSPARK 2026 : NATIONAL ROBOTICS FIESTA",
  eventSubtitle: "The Flagship Robotics Championship of Northern Bangladesh",
  targetDate: "2026-11-28T09:00:00+06:00",
  venue: "Varendra University Permanent Campus, Rajshahi",
  registrationOpen: true,
  registrationLink: "/events#register",
  detailsLink: "/events",
};
