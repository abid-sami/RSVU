import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Tournaments",
  description: "Explore upcoming and past robotics tournaments, RoboSpark championships, seminars, and technical workshops organized by RSVU.",
  openGraph: {
    title: "Events & Tournaments | RSVU Robotics",
    description: "Explore upcoming and past robotics tournaments, RoboSpark championships, seminars, and technical workshops organized by RSVU.",
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
