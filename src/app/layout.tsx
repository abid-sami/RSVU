import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";
import { siteConfig } from "@/config/siteConfig";

export const viewport: Viewport = {
  themeColor: "#06090e",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Robotics Society of Varendra University | RSVU",
    template: "%s | RSVU Robotics",
  },
  description:
    "Official portal of the Robotics Society of Varendra University (RSVU). Learn, Build, Innovate with cutting-edge autonomous rovers, Robo Soccer, LFR, embedded IoT hardware, and national competitions in Rajshahi, Bangladesh.",
  keywords: [
    "Robotics Society of Varendra University",
    "RSVU",
    "RSVU Robotics",
    "Varendra University",
    "Varendra University Robotics Club",
    "RoboSpark",
    "RoboSpark 2026",
    "Line Follower Robot Bangladesh",
    "Robo Soccer",
    "Robotics Club Rajshahi",
    "Bangladesh Robotics",
    "Hardware Component Requisition",
    "Autonomous Robotics",
    "Microcontroller Programming",
    "STEM Education Bangladesh",
  ],
  authors: [{ name: siteConfig.developerCredit.name, url: siteConfig.developerCredit.url }],
  creator: siteConfig.developerCredit.name,
  publisher: siteConfig.fullName,
  category: "Technology & Engineering",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.siteUrl,
    siteName: siteConfig.fullName,
    title: "Robotics Society of Varendra University | RSVU Robotics",
    description:
      "Learn. Build. Innovate. The premier university robotics & autonomous systems engineering society of northern Bangladesh.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Robotics Society of Varendra University - Learn. Build. Innovate.",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robotics Society of Varendra University | RSVU Robotics",
    description:
      "Learn. Build. Innovate. The premier university robotics & autonomous systems engineering society of northern Bangladesh.",
    images: ["/og-image.jpg"],
    creator: "@rsvu_robotics",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo.webp", type: "image/webp" },
      { url: "https://i.ibb.co.com/LD6DpyVB/RSVU.webp", type: "image/webp" },
    ],
    shortcut: "/logo.webp",
    apple: "https://i.ibb.co.com/LD6DpyVB/RSVU.webp",
  },
  manifest: "/site.webmanifest",
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      siteConfig.googleSiteVerification ||
      undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/logo.webp`,
    image: `${siteConfig.siteUrl}/og-image.jpg`,
    description: siteConfig.shortDescription,
    foundingDate: "2014",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressLocality: "Rajshahi",
      postalCode: "6204",
      addressRegion: "Rajshahi",
      addressCountry: "BD",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      contactType: "General Inquiries",
      email: siteConfig.contact.email,
    },
    sameAs: [
      siteConfig.socials.facebook,
      siteConfig.developerCredit.url,
    ].filter((u) => u && u !== "/"),
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#06090e] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black antialiased">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
