export interface ExecutiveMember {
  id: string;
  name: string;
  designation: string;
  roleType: "Advisor" | "Executive Panel" | "Technical Team" | "Management Team";
  department: string;
  batch?: string;
  avatar: string;
  bio: string;
  skills: string[];
  links: {
    github?: string;
    linkedin?: string;
    email?: string;
    facebook?: string;
  };
}

export const advisorsList: ExecutiveMember[] = [
  {
    id: "adv-1",
    name: "Prof. Dr. Md. Khademul Islam",
    designation: "Chief Faculty Advisor & Head",
    roleType: "Advisor",
    department: "Department of Computer Science & Engineering",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    bio: "Guiding the research trajectory and academic robotics integration at Varendra University since 2014.",
    skills: ["Embedded Computing", "Robotics Research", "Academic Supervision"],
    links: {
      linkedin: "https://linkedin.com",
      email: "khademul@vu.edu.bd",
    },
  },
  {
    id: "adv-2",
    name: "Engr. Tanvir Ahmed",
    designation: "Technical Mentor & Assistant Professor",
    roleType: "Advisor",
    department: "Department of Electrical & Electronic Engineering",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bio: "Specialist in power electronics, brushless motor drive controllers, and autonomous mobile robotics.",
    skills: ["Power Electronics", "Motor Controllers", "IoT Architecture"],
    links: {
      linkedin: "https://linkedin.com",
      email: "tanvir.eee@vu.edu.bd",
    },
  },
];

export const executiveMembers: ExecutiveMember[] = [
  {
    id: "exec-1",
    name: "Abrar Shahriar",
    designation: "President",
    roleType: "Executive Panel",
    department: "Dept. of CSE, 17th Batch",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    bio: "Leading RSVU's inter-university competitive delegations, strategy, and strategic hardware partnerships.",
    skills: ["Autonomous Navigation", "ROS 2", "Strategic Leadership"],
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "president@rsvu.edu.bd",
    },
  },
  {
    id: "exec-2",
    name: "Tahsina Rahman",
    designation: "Vice President (R&D)",
    roleType: "Executive Panel",
    department: "Dept. of EEE, 18th Batch",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    bio: "Directing research laboratories, hardware component acquisition, and advanced telemetry projects.",
    skills: ["PCB Routing", "Altium Designer", "Firmware Architecture"],
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "exec-3",
    name: "Ragib Hasan Abid Sami",
    designation: "General Secretary & Tech Lead",
    roleType: "Executive Panel",
    department: "Dept. of CSE, 18th Batch",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    bio: "Architecting RSVU digital platforms, embedded systems curricula, and competitive line follower teams.",
    skills: ["Full Stack Systems", "Microcontrollers", "PID Tuning", "Algorithm Design"],
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "ragibhasan@vu.edu.bd",
    },
  },
  {
    id: "exec-4",
    name: "Zubair Al Mahmud",
    designation: "Joint Secretary (Operations)",
    roleType: "Executive Panel",
    department: "Dept. of CSE, 19th Batch",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    bio: "Managing event operations, workshop logistics, intra-university championships, and safety standards.",
    skills: ["Operations Management", "Event Logistics", "Hardware QA"],
    links: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "exec-5",
    name: "Nafisa Anjum",
    designation: "Treasurer & Finance Secretary",
    roleType: "Executive Panel",
    department: "Dept. of CSE, 19th Batch",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    bio: "Managing club budget allocation, hardware procurement, event sponsorships, and accounts audit.",
    skills: ["Fiscal Planning", "Procurement", "Sponsorship Outreach"],
    links: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "exec-6",
    name: "Fahim Faysal",
    designation: "Head of Robotics Hardware & Prototyping",
    roleType: "Technical Team",
    department: "Dept. of EEE, 19th Batch",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    bio: "Mastering CNC routing, 3D additive prototyping, motor driver testing, and high-discharge battery setups.",
    skills: ["CAD/CAM 3D", "High-current Drivers", "Mechanical Chassis"],
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "exec-7",
    name: "Samira Akhtar",
    designation: "Lead, AI & Computer Vision",
    roleType: "Technical Team",
    department: "Dept. of CSE, 20th Batch",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    bio: "Developing edge AI perception models, YOLO obstacle detectors, and OpenCV robotic arm vision.",
    skills: ["OpenCV", "PyTorch", "Jetson Optimization", "Edge Computing"],
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "exec-8",
    name: "Mahir Faisal",
    designation: "Robo Soccer Squad Captain",
    roleType: "Technical Team",
    department: "Dept. of CSE, 20th Batch",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
    bio: "Designing pneumatic kicker assemblies, low-latency telemetry controllers, and high-agility soccer chassis.",
    skills: ["High-Torque DC Motors", "Tactical Driving", "RF Telemetry"],
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "exec-9",
    name: "Sadia Islam",
    designation: "Head of Media, PR & Communications",
    roleType: "Management Team",
    department: "Dept. of CSE, 20th Batch",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    bio: "Curating RSVU digital media branding, competition broadcasts, event press releases, and partner relations.",
    skills: ["Brand Narrative", "Technical Writing", "Digital Media Strategy"],
    links: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "exec-10",
    name: "Kazi Rayhan",
    designation: "Head of Workshop & Logistics",
    roleType: "Management Team",
    department: "Dept. of EEE, 21st Batch",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bio: "Organizing lab equipment inventory, weekly novice training sessions, and competition arena setups.",
    skills: ["Inventory Management", "Lab Operations", "Hardware Safety"],
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
];
