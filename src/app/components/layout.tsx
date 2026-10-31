import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hardware Lab & Component Requisition",
  description: "Browse the RSVU hardware inventory of microcontrollers, sensors, drivers, and development boards available for student project requisition.",
  openGraph: {
    title: "Hardware Lab & Component Requisition | RSVU Robotics",
    description: "Browse the RSVU hardware inventory of microcontrollers, sensors, drivers, and development boards available for student project requisition.",
  },
};

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
