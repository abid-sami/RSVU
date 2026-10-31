import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hall of Fame & National Championships",
  description: "Celebrating RSVU national championship titles, line follower robot podium finishes, and inter-university tournament awards across Bangladesh.",
  openGraph: {
    title: "Hall of Fame & National Championships | RSVU Robotics",
    description: "Celebrating RSVU national championship titles, line follower robot podium finishes, and inter-university tournament awards across Bangladesh.",
  },
};

export default function AchievementsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
