import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Join Society",
  description: "Connect with the Robotics Society of Varendra University executive board. Submit general inquiries or apply for society membership.",
  openGraph: {
    title: "Contact Us & Join Society | RSVU Robotics",
    description: "Connect with the Robotics Society of Varendra University executive board. Submit general inquiries or apply for society membership.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
