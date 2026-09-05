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

export const clubTargets: TargetGoal[] = [
  {
    id: "target-1",
    milestone: "2026 Q3",
    phase: "Current Priority",
    title: "Autonomous Campus Delivery Rover Prototype (V-Rover)",
    category: "Research",
    description: "Developing a fully autonomous 4-wheel differential rover capable of indoor/outdoor waypoint navigation across Varendra University permanent campus using GPS, LiDAR SLAM, and computer vision.",
    targets: [
      "Finalize rugged outdoor aluminum chassis & suspension",
      "Deploy ROS 2 Humble Nav2 waypoint navigation stack",
      "Achieve real-time dynamic pedestrian avoidance at 1.5 m/s",
    ],
    statusPercent: 70,
  },
  {
    id: "target-2",
    milestone: "2026 Q4",
    phase: "Phase 2 (2026 Q3-Q4)",
    title: "University Robotic Hardware Bank & MakerSpace Expansion",
    category: "Infrastructure",
    description: "Expanding the RSVU Hardware Bank to over 150+ loanable microcontroller boards, high-power drivers, and precision optical sensors for all engineering students.",
    targets: [
      "Acquire dual SLA 3D printers and high-speed CNC PCB milling machine",
      "Implement RFID-based automated equipment borrowing checkout kiosk",
      "Secure industrial component sponsorship with leading hardware manufacturers",
    ],
    statusPercent: 55,
  },
  {
    id: "target-3",
    milestone: "2027 Q1",
    phase: "Phase 3 (2027)",
    title: "International Robotics Contest Delegation (RoboGames / FIRA)",
    category: "Competition",
    description: "Sending our premier national championship squad to represent Varendra University and Bangladesh at renowned international robotics challenges in Southeast Asia.",
    targets: [
      "Design 30kg combat-weight pneumatic flipper bot",
      "Fine-tune ultra-high-speed magnetic downforce Line Follower bot (<10ms cycle)",
      "Publish peer-reviewed conference paper on multi-robot swarm localization",
    ],
    statusPercent: 40,
  },
  {
    id: "target-4",
    milestone: "Continuous",
    phase: "Current Priority",
    title: "Rajshahi Regional High-School STEM & Robotics Initiative",
    category: "Community Outreach",
    description: "Democratizing hardware knowledge across colleges and schools in Rajshahi Division with free basic Arduino, sensor, and coding workshops.",
    targets: [
      "Conduct workshops across 12 regional schools and polytechnic institutes",
      "Distribute 50+ free beginner micro-robotics kits",
      "Host the Northern Bangladesh Junior Robotics Exhibition",
    ],
    statusPercent: 85,
  },
];
