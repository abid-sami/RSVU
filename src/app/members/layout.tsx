import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Executive Committee & Faculty Advisors",
  description: "Meet the executive board, faculty advisory panel, and team leads driving the Robotics Society of Varendra University.",
  openGraph: {
    title: "Executive Committee & Faculty Advisors | RSVU Robotics",
    description: "Meet the executive board, faculty advisory panel, and team leads driving the Robotics Society of Varendra University.",
  },
};

export default function MembersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
