export interface CountdownConfig {
  isEnabled: boolean;
  eventTitle: string;
  eventSubtitle: string;
  targetDate: string; // ISO 8601 string or Date parseable or "TBA"
  venue: string;
  registrationOpen: boolean;
  registrationLink?: string;
  detailsLink?: string;
}

// Configured so future admin panel / backend API can simply update this object
export const upcomingEventCountdown: CountdownConfig = {
  isEnabled: true,
  eventTitle: "ROBOSPARK 1.1",
  eventSubtitle: "The Flagship Robotics Championship of Northern Bangladesh",
  targetDate: "TBA",
  venue: "Varendra University (To Be Announced)",
  registrationOpen: false,
  registrationLink: "/events",
  detailsLink: "/events",
};
