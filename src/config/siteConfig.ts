export const siteConfig = {
  name: "RSVU Robotics",
  fullName: "Robotics Society of Varendra University",
  university: "Varendra University",
  location: "Rajshahi, Bangladesh",
  established: 2014,
  tagline: "LEARN. BUILD. INNOVATE.",
  shortDescription:
    "The premier robotics & autonomous systems research, prototyping, and engineering community of Varendra University, fostering pioneers in hardware, embedded systems, and robotics AI.",

  // Single easy-to-edit configuration variable for Hero background video
  heroVideoUrl: "/loading.mp4",

  // Official RSVU Robotics logo & SEO assets
  logoUrl: "https://i.ibb.co.com/LD6DpyVB/RSVU.webp",
  localLogoUrl: "/logo.webp",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://rsvu.vercel.app"),
  ogImageUrl: "/og-image.jpg",
  // Google Search Console Verification Code (content="..." from your meta tag)
  googleSiteVerification: "BlghWvxt9qmwDludErWzLo1YYvsAiMZakqqD96fExw8",

  stats: {
    yearsActive: "12+",
    executiveMembers: "41+",
    eventsOrganized: "5+",
    projectsCompleted: "35+",
    nationalAwards: "12+",
    activeVolunteers: "180+",
  },

  developerCredit: {
    name: "Ragib Hasan Abid Sami",
    text: "Developed by Ragib Hasan Abid Sami",
    url: "https://github.com/samiragib",
  },

  contact: {
    email: "prs.rsvu4@gmail.com",
    altEmail: "rsvu.robotics.society@gmail.com",
    phone: "+880 1734-445665",
    address: "Kharkhari Bypass Road, Chandrima, Rajshahi-6204, Bangladesh",
    labLocation: "Robotics Club, Room 102, Ground Floor",
  },

  socials: {
    facebook: "https://www.facebook.com/robotics.society.vu",
    linkedin: "/",
    github: "/",
    youtube: "/",
  },

  recruitment: {
    enabled: true,
    title: "Join Society",
    deadline: "1 November",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSezSXnV2RdG8uwecUME_O_v3XoaqYDQfl598-tpMk50OEffwg/viewform",
  },

  navLinks: [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "EVENTS", href: "/events" },
    { name: "COMPONENTS", href: "/components" },
    { name: "MEMBERS", href: "/members" },
    { name: "ACHIEVEMENTS", href: "/achievements" },
    { name: "GALLERY", href: "/gallery" },
    { name: "CONTACT", href: "/contact" },
  ],
};
