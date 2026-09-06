export interface AchievementItem {
  id: string;
  title: string;
  competition: string;
  category: "National Championship" | "Inter-University" | "Innovation & Research" | "Intra-University";
  year: string;
  award: string; // e.g. "Champion", "1st Runner-Up", "Best Technical Design"
  organizer: string;
  description: string;
  teamMembers: string[];
  projectOrBotName: string;
  image: string;
  badgeType: "gold" | "silver" | "bronze" | "special";
}

export const achievementStats = [
  { value: "12+", label: "National Awards Won", suffix: "Podiums" },
  { value: "35+", label: "LFR & Robo Soccer Bots Built", suffix: "Prototypes" },
  { value: "450+", label: "Students Trained in Robotics", suffix: "Alumni" },
  { value: "12+", label: "Years of Continuous Excellence", suffix: "Since 2014" },
];

export const achievementsList: AchievementItem[] = [
  {
    id: "ach-1",
    title: "National Champion - High-Speed Line Follower Robot",
    competition: "DUET TechFest National Robotics Championship",
    category: "National Championship",
    year: "2025",
    award: "Champion (1st Place)",
    organizer: "Dhaka University of Engineering & Technology (DUET)",
    description: "Our bot 'Varendra Raptor' clocked the fastest course completion time in the tournament, navigating reverse-inversions and sharp hairpins flawlessly with custom PID algorithms.",
    teamMembers: ["Ragib Hasan Abid Sami", "Abrar Shahriar", "Fahim Faysal"],
    projectOrBotName: "Varendra Raptor X-1",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    badgeType: "gold",
  },
  {
    id: "ach-2",
    title: "1st Runner-Up - Robo Soccer Showdown",
    competition: "RUET Megatronics Carnival",
    category: "National Championship",
    year: "2024",
    award: "1st Runner-Up",
    organizer: "Rajshahi University of Engineering & Technology (RUET)",
    description: "Battled through a 32-team national bracket with 8 consecutive knockout match victories using high-torque dual planetary drive bots with spring-tensioned pneumatic kickers.",
    teamMembers: ["Mahir Faisal", "Zubair Al Mahmud", "Kazi Rayhan"],
    projectOrBotName: "Titan Striker MK-II",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    badgeType: "silver",
  },
  {
    id: "ach-3",
    title: "Best Hardware Innovation Award",
    competition: "Bangladesh Youth Robotics Summit (BYRS)",
    category: "Innovation & Research",
    year: "2024",
    award: "Best Technical Innovation",
    organizer: "ICT Division & BASIS",
    description: "Developed 'AgriBot-V', an autonomous solar-assisted soil scanning and localized pesticide micro-spraying agricultural ground rover with embedded edge AI vision.",
    teamMembers: ["Tahsina Rahman", "Samira Akhtar", "Nafisa Anjum"],
    projectOrBotName: "AgriBot-V Solar Rover",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    badgeType: "special",
  },
  {
    id: "ach-4",
    title: "2nd Runner-Up - Autonomous Obstacle Avoidance Challenge",
    competition: "KUET Technovance Robotics Carnival",
    category: "National Championship",
    year: "2023",
    award: "2nd Runner-Up (3rd Place)",
    organizer: "Khulna University of Engineering & Technology (KUET)",
    description: "Navigated real-time unknown maze terrain equipped with ultrasonic array and RPLIDAR 2D mapping nodes executing obstacle clearance within record seconds.",
    teamMembers: ["Abrar Shahriar", "Ragib Hasan Abid Sami"],
    projectOrBotName: "CyberRover SLAM-1",
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=800&q=80",
    badgeType: "bronze",
  },
  {
    id: "ach-5",
    title: "Champion - Inter-University Line Follower Clash",
    competition: "North Bengal Engineering Fiesta",
    category: "Inter-University",
    year: "2023",
    award: "Champion (1st Place)",
    organizer: "Department of EEE, RU",
    description: "Dominated the time trial rounds with an astonishing 14.8-second lap time on a 22-meter multi-intersection circuit.",
    teamMembers: ["Ragib Hasan Abid Sami", "Fahim Faysal"],
    projectOrBotName: "Velocity Prime",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    badgeType: "gold",
  },
  {
    id: "ach-6",
    title: "Best Research Poster Award: ROS2 Micro-controller Integration",
    competition: "International Conference on Computer & Information Engineering (ICCIE)",
    category: "Innovation & Research",
    year: "2022",
    award: "Best Academic Poster",
    organizer: "IEEE Student Branch & Varendra University",
    description: "Presented a low-cost micro-ROS bridge protocol operating on 32-bit Cortex M4 microcontrollers with deterministic pub/sub latency benchmarks.",
    teamMembers: ["Abrar Shahriar", "Samira Akhtar"],
    projectOrBotName: "Micro-ROS Bridge Architecture",
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80",
    badgeType: "special",
  },
];
