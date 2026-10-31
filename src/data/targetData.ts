export interface TargetGoal {
  id: string;
  milestone: string;
  phase: "Current Priority" | "Phase 2 (2026 Q3-Q4)" | "Phase 3 (2027)";
  title: string;
  category: "Research" | "Competition" | "Infrastructure" | "Community Outreach";
  description: string;
  targets: string[];
  statusPercent: number;
}

export interface GoalItem {
  id: string;
  num: string;
  title: string;
  description: string;
  badge: string;
}

export interface ActivityItem {
  id: string;
  num: string;
  title: string;
  description: string;
  badge: string;
}

export const clubGoals: string[] = [
  "To inspire innovation and creativity in the field of robotics.",
  "To provide hands-on experience with robotics design, development, and programming.",
  "To prepare students for robotics competitions at national and international levels.",
  "To promote interdisciplinary collaboration among students interested in robotics, AI, and electronics.",
];

export const clubActivities: string[] = [
  "Organizes workshops and training sessions on robotics, IoT, and embedded systems.",
  "Conducts hands-on projects to build and program robots.",
  "Hosts intra-university robotics competitions and exhibitions.",
  "Encourages participation in national and international robotics contests.",
  "Facilitates collaboration and mentorship among students for research and innovation in robotics.",
];

export const structuredGoals: GoalItem[] = [
  {
    id: "goal-1",
    num: "01",
    title: "Inspire Innovation & Creativity",
    description: "To inspire innovation and creativity in the field of robotics.",
    badge: "CREATIVITY",
  },
  {
    id: "goal-2",
    num: "02",
    title: "Hands-on Design & Programming",
    description: "To provide hands-on experience with robotics design, development, and programming.",
    badge: "ENGINEERING",
  },
  {
    id: "goal-3",
    num: "03",
    title: "National & Global Arenas",
    description: "To prepare students for robotics competitions at national and international levels.",
    badge: "COMPETITIONS",
  },
  {
    id: "goal-4",
    num: "04",
    title: "Interdisciplinary Synergy",
    description: "To promote interdisciplinary collaboration among students interested in robotics, AI, and electronics.",
    badge: "COLLABORATION",
  },
];

export const structuredActivities: ActivityItem[] = [
  {
    id: "act-1",
    num: "01",
    title: "Robotics, IoT & Embedded Workshops",
    description: "Organizes workshops and training sessions on robotics, IoT, and embedded systems.",
    badge: "TRAINING",
  },
  {
    id: "act-2",
    num: "02",
    title: "Hands-on Robot Building & R&D",
    description: "Conducts hands-on projects to build and program robots.",
    badge: "PROTOTYPING",
  },
  {
    id: "act-3",
    num: "03",
    title: "Intra-University Battles & Expos",
    description: "Hosts intra-university robotics competitions and exhibitions.",
    badge: "EXHIBITIONS",
  },
  {
    id: "act-4",
    num: "04",
    title: "Championship Tournaments & Contests",
    description: "Encourages participation in national and international robotics contests.",
    badge: "TOURNAMENTS",
  },
  {
    id: "act-5",
    num: "05",
    title: "Collaborative Research & Mentorship",
    description: "Facilitates collaboration and mentorship among students for research and innovation in robotics.",
    badge: "MENTORSHIP",
  },
];

export const clubTargets: TargetGoal[] = [
  {
    id: "target-1",
    milestone: "Core Target",
    phase: "Current Priority",
    title: "Robotics Design, Prototyping & Programming",
    category: "Research",
    description: "Equipping university students with hands-on experience in robotic hardware design, CAD modeling, circuit fabrication, sensor telemetry, and embedded software programming.",
    targets: [
      "To inspire innovation and creativity in the field of robotics.",
      "To provide hands-on experience with robotics design, development, and programming.",
      "Conducts hands-on projects to build and program robots.",
    ],
    statusPercent: 85,
  },
  {
    id: "target-2",
    milestone: "Championship Squads",
    phase: "Current Priority",
    title: "National & International Robotics Contests",
    category: "Competition",
    description: "Training competitive squads for high-speed line followers, autonomous combat rovers, robo-soccer, and regional championship arenas across Bangladesh and abroad.",
    targets: [
      "To prepare students for robotics competitions at national and international levels.",
      "Hosts intra-university robotics competitions and exhibitions.",
      "Encourages participation in national and international robotics contests.",
    ],
    statusPercent: 75,
  },
  {
    id: "target-3",
    milestone: "Hands-on Bootcamps",
    phase: "Current Priority",
    title: "Workshops in Robotics, IoT & Embedded Systems",
    category: "Community Outreach",
    description: "Hosting structured skill-building workshops, beginner microcontroller training, IoT networking labs, and practical hardware design masterclasses.",
    targets: [
      "Organizes workshops and training sessions on robotics, IoT, and embedded systems.",
      "Conducts hands-on projects to build and program robots.",
      "Hands-on sensor calibration and micro-step motor tuning masterclasses.",
    ],
    statusPercent: 90,
  },
  {
    id: "target-4",
    milestone: "Innovation Vanguard",
    phase: "Current Priority",
    title: "Interdisciplinary Collaboration & Research Mentorship",
    category: "Research",
    description: "Fostering collaboration between CSE, EEE, and engineering disciplines, pairing senior mentors and faculty advisors with student innovation teams.",
    targets: [
      "To promote interdisciplinary collaboration among students interested in robotics, AI, and electronics.",
      "Facilitates collaboration and mentorship among students for research and innovation in robotics.",
      "Bridging autonomous hardware with robotics AI and research innovation.",
    ],
    statusPercent: 80,
  },
];
