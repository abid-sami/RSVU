export interface ClubEvent {
  id: string;
  title: string;
  category: "Robo Soccer" | "Line Follower" | "Hardware Showcase" | "Poster Presentation" | "Workshop" | "Championship" | "Robo Race";
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
  registration?: "Open" | "Closed" | "Upcoming";
  registrationOpen?: boolean;
  registrationStatusText?: string;
  registrationCtaText?: string;
}

export const upcomingEvents: ClubEvent[] = [
  {
    id: "lfr-velocity-rush",
    title: "LFR Velocity Rush",
    category: "Line Follower",
    status: "upcoming",
    date: "To Be Announced (TBA)",
    venue: "To Be Announced (TBA)",
    fee: "TBA",
    teamSize: "TBA",
    prizePool: "Announcing Soon",
    image: "/Gallery/774185974_122141499879081563_2515616477361728924_n.jpg",
    shortDescription: "High-octane sprint line follower track designed for lightning-fast straightaways and precision speed tuning in RoboSpark 1.1.",
    fullDescription:
      "LFR Velocity Rush challenges autonomous robotics builders to maximize velocity without sacrificing tracking stability. Featuring precision straightaways, gradual curves, and high-RPM motor driving, this segment tests the extreme limits of PID tuning and sensor response times.",
    highlights: ["Sprint velocity straightaways", "High-response sensor array benchmarking", "Digital timing gates"],
    rulebookUrl: "#rulebook-velocity-rush",
    registration: "Upcoming",
    registrationOpen: false,
    registrationStatusText: "Details Announcing Soon",
    registrationCtaText: "DETAILS ANNOUNCING SOON",
  },
  {
    id: "lfr-nexus-challenge",
    title: "LFR Nexus Challenge",
    category: "Line Follower",
    status: "upcoming",
    date: "To Be Announced (TBA)",
    venue: "To Be Announced (TBA)",
    fee: "TBA",
    teamSize: "TBA",
    prizePool: "Announcing Soon",
    image: "/Gallery/768406560_122139634979081563_8188267272714275034_n.jpg",
    shortDescription: "A sophisticated navigational maze featuring acute hairpin bends, line inversions, and multi-path decision logic.",
    fullDescription:
      "LFR Nexus Challenge represents the pinnacle of algorithmic intelligence. Autonomous bots must navigate through intricate intersections, sharp acute loops, elevation ramps, and inverted track colors with zero manual interventions.",
    highlights: ["Acute 90° & hairpin navigation", "Inverted surface handling", "Algorithmic path decision benchmark"],
    rulebookUrl: "#rulebook-nexus-challenge",
    registration: "Upcoming",
    registrationOpen: false,
    registrationStatusText: "Details Announcing Soon",
    registrationCtaText: "DETAILS ANNOUNCING SOON",
  },
  {
    id: "robo-soccer-1-1",
    title: "Robo Soccer",
    category: "Robo Soccer",
    status: "upcoming",
    date: "To Be Announced (TBA)",
    venue: "To Be Announced (TBA)",
    fee: "TBA",
    teamSize: "TBA",
    prizePool: "Announcing Soon",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "High-adrenaline tactical football clash where wireless combat bots battle for turf dominance and goal precision.",
    fullDescription:
      "Equip your high-torque wireless bots for the premier Robo Soccer arena at RoboSpark 1.1. Maneuver through opponent barricades, pass, block, and execute precision shots in an intense knockout tournament format.",
    highlights: ["2.4GHz wireless control arena", "Tactical offensive & defensive bot specs", "Double elimination championship bracket"],
    rulebookUrl: "#rulebook-soccer",
    registration: "Upcoming",
    registrationOpen: false,
    registrationStatusText: "Details Announcing Soon",
    registrationCtaText: "DETAILS ANNOUNCING SOON",
  },
  {
    id: "robo-race-1-1",
    title: "Robo Race",
    category: "Robo Race",
    status: "upcoming",
    date: "To Be Announced (TBA)",
    venue: "To Be Announced (TBA)",
    fee: "TBA",
    teamSize: "TBA",
    prizePool: "Announcing Soon",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "Rugged all-terrain obstacle endurance rally testing chassis suspension, powertrain torque, and pilot reflex.",
    fullDescription:
      "Robo Race puts remote-controlled all-terrain bots against an unforgiving obstacle course containing elevation ramps, gravel pits, rocker-bogie tests, bridge crossings, and speed chicanes. Only the most durable chassis and sharpest pilots will take the podium.",
    highlights: ["All-terrain obstacles & elevation ramps", "Suspension & torque endurance test", "Time-trial knockout showdown"],
    rulebookUrl: "#rulebook-robo-race",
    registration: "Upcoming",
    registrationOpen: false,
    registrationStatusText: "Details Announcing Soon",
    registrationCtaText: "DETAILS ANNOUNCING SOON",
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
