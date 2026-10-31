import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Gallery & Tournament Highlights",
  description: "Photos and visual chronicle of RoboSpark competitions, hardware prototyping labs, and robotics society milestones at Varendra University.",
  openGraph: {
    title: "Media Gallery & Tournament Highlights | RSVU Robotics",
    description: "Photos and visual chronicle of RoboSpark competitions, hardware prototyping labs, and robotics society milestones at Varendra University.",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
