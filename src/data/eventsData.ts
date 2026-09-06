export interface ClubEvent {
  id: string;
  title: string;
  category: "Robo Soccer" | "Line Follower" | "Hardware Showcase" | "Poster Presentation" | "Workshop" | "Championship";
  status: "upcoming" | "past";
  date: string;
  time?: string;
  venue: string;
  prizePool?: string;
  fee?: string;
  teamSize?: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  rulebookUrl?: string;
  registration?: "Open" | "Closed";
  registrationOpen?: boolean;
}

export const upcomingEvents: ClubEvent[] = [
 
  {
    id: "robo-soccer-2026",
    title: "Robo Soccer Championship",
    category: "Robo Soccer",
    status: "upcoming",
    date: "November 28, 2026",
    time: "",
    venue: "Main Arena, Central Auditorium, VU",
    prizePool: "BDT 40,000",
    fee: "BDT 1,500",
    teamSize: "2 - 4 Members",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "High-octane autonomous & manual bots clashing in tactical gridiron football matches.",
    fullDescription:
      "Prepare your dual-motor chassis, wireless telemetry, and tactical kick mechanisms. Teams from across Bangladesh will pit their custom bots in a rugged miniature football arena. Experience lightning-fast accelerations, defensive barricades, and precision shooting.",
    highlights: ["Real-time 2.4GHz RF control", "Defensive & offensive chassis specs", "Double elimination bracket"],
    rulebookUrl: "#rulebook-soccer",
    registrationOpen: true,
  },
  {
    id: "line-follower-2026",
    title: "Line Follower Robot (LFR) Velocity",
    category: "Line Follower",
    status: "upcoming",
    date: "November 28, 2026",
    time: "11:30 AM - 04:00 PM",
    venue: "Robotics Track Zone B, Ground Floor",
    prizePool: "BDT 35,000",
    fee: "BDT 1,000",
    teamSize: "1 - 3 Members",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "PID-tuned speedsters navigating acute turns, intersections, inverted colors, and speed bumps.",
    fullDescription:
      "The definitive test of sensor calibration, PID tuning, and high-RPM micro metal gearmotors. Autonomous bots must trace complex black lines on white surfaces featuring hairpins, gaps, 90-degree zigzags, and elevation ramps without human intervention.",
    highlights: ["Advanced PID tuning test", "Dynamic lighting resistance", "Laser gate lap timing precision"],
    rulebookUrl: "#rulebook-lfr",
    registrationOpen: true,
  },
  {
    id: "hardware-showcase-2026",
    title: "National Hardware Showcase",
    category: "Hardware Showcase",
    status: "upcoming",
    date: "November 29, 2026",
    time: "09:30 AM - 03:30 PM",
    venue: "Engineering Atrium & Innovation Hall",
    prizePool: "BDT 50,000",
    fee: "BDT 1,200",
    teamSize: "2 - 5 Members",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "Innovative engineering prototypes solving industrial automation, healthcare, and robotics challenges.",
    fullDescription:
      "Display your embedded hardware systems, agricultural rovers, biomedical diagnostic tools, and IoT automation products. Evaluated by university faculty, industry engineering leaders, and venture mentors on novelty, execution, and commercial viability.",
    highlights: ["Live working prototype demos", "Industry jury assessment", "Incubation & funding opportunities"],
    rulebookUrl: "#rulebook-hardware",
    registrationOpen: true,
  },
  {
    id: "poster-presentation-2026",
    title: "Robotics & AI Poster Presentation",
    category: "Poster Presentation",
    status: "upcoming",
    date: "November 29, 2026",
    time: "10:00 AM - 02:00 PM",
    venue: "Faculty Seminar Hall 3, VU",
    prizePool: "BDT 25,000",
    fee: "BDT 500",
    teamSize: "1 - 3 Members",
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "Original research concepts in autonomous mobile robotics, computer vision, and ROS 2 pipelines.",
    fullDescription:
      "Present novel engineering research, algorithmic solutions in SLAM, computer vision for manipulator arms, reinforcement learning for quadruped robots, and human-robot interaction architectures.",
    highlights: ["Peer-reviewed evaluation", "Academic poster format standard", "Certificate of publication honor"],
    rulebookUrl: "#rulebook-poster",
    registrationOpen: true,
  },
];

export const pastEvents: ClubEvent[] = [
  {
    id: "robospark-2025",
    title: "RoboSpark 2025: National Robotics Carnival",
    category: "Championship",
    status: "past",
    date: "December 14, 2025",
    venue: "VU Main Campus, Rajshahi",
    fee: "BDT 1,500",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "Over 65 teams from 22 universities competed in LFR, Soccer Bots, and Project Show.",
    fullDescription: "Our biggest flagship event gathered over 400 robotics enthusiasts across Bangladesh with fierce competition in line following and battle soccer.",
    highlights: ["22 Universities joined", "65+ Team submissions", "BDT 120,000 Total Prize Distributed"],
  },
  {
    id: "lfr-duel-2024",
    title: "Intra-University LFR Duel 2024",
    category: "Line Follower",
    status: "past",
    date: "July 20, 2024",
    venue: "VU Robotics Lab Arena",
    fee: "Free",
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "Freshman and sophomore members tested their custom QTR-8A sensor calibration.",
    fullDescription: "An internal skill-building tournament focused on algorithmic optimization, micro-step motor driving, and optical calibration for university students.",
    highlights: ["28 Internal squads", "Hands-on calibration clinic", "Best rookie chassis award"],
  },
  {
    id: "iot-robotics-bootcamp-2023",
    title: "ESP32 & IoT Embedded Systems Bootcamp",
    category: "Workshop",
    status: "past",
    date: "October 10 - 15, 2023",
    venue: "Hardware Prototyping Lab 402",
    fee: "BDT 500",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "Intensive 5-day hands-on bootcamp building WiFi telemetry, MQTT relays, and smart sensors.",
    fullDescription: "Comprehensive training on dual-core microcontrollers, FreeRTOS basics, wireless camera streaming, and motor drivers.",
    highlights: ["90+ Certified participants", "Free hardware dev board kits", "Capstone drone telemetry demo"],
  },
  {
    id: "autonomous-rover-2022",
    title: "ROS & Autonomous Rover Hackathon",
    category: "Workshop",
    status: "past",
    date: "March 18, 2022",
    venue: "Computer Science Lab 3, VU",
    fee: "Free",
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "Simulating LiDAR SLAM, Gazebo environments, and waypoint navigation on TurtleBot chassis.",
    fullDescription: "Pioneering ROS 1 & 2 integration workshop at Varendra University for senior students developing autonomous delivery rovers.",
    highlights: ["Gazebo physics simulations", "2D LiDAR mapping", "A* and Dijkstra navigation paths"],
  },
];

export const allEvents: ClubEvent[] = [...upcomingEvents, ...pastEvents];

export const getDefaultEventFilter = (): "upcoming" | "past" => {
  if (upcomingEvents.length > 0) return "upcoming";
  return "past";
};
