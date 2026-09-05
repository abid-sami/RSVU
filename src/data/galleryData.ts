export interface GalleryItem {
  id: string;
  title: string;
  category: "Competitions" | "Workshops" | "Hardware Labs" | "Team & Events";
  date: string;
  image: string;
  caption: string;
  tag: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "High-Octane Robo Soccer Final Round",
    category: "Competitions",
    date: "December 2025",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=85",
    caption: "Intense tactical soccer bot showdown inside the Varendra University Central Arena.",
    tag: "Robo Soccer",
  },
  {
    id: "gal-2",
    title: "PID Sensor Array Tuning Session",
    category: "Hardware Labs",
    date: "October 2025",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
    caption: "Students analyzing real-time analog reflectance signals with digital oscilloscopes in Lab 402.",
    tag: "Robotics Lab",
  },
  {
    id: "gal-3",
    title: "ESP32 Embedded Systems Hands-On Bootcamp",
    category: "Workshops",
    date: "September 2025",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=85",
    caption: "Over 80 freshman engineers building their first wireless telemetry WiFi rovers.",
    tag: "Bootcamp",
  },
  {
    id: "gal-4",
    title: "Line Follower Robot High-Speed Track Run",
    category: "Competitions",
    date: "November 2025",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85",
    caption: "Precision bot negotiating a 135-degree hairpin curve at maximum RPM.",
    tag: "LFR Velocity",
  },
  {
    id: "gal-5",
    title: "Custom Dual-Layer PCB Soldering Clinic",
    category: "Hardware Labs",
    date: "August 2025",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
    caption: "Reflow soldering SMD MOSFET motor drivers and logic isolators for combat chassis.",
    tag: "Electronics Lab",
  },
  {
    id: "gal-6",
    title: "Executive Committee & Mentors Induction",
    category: "Team & Events",
    date: "January 2026",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85",
    caption: "Annual executive board oath taking and welcome session for freshman innovators.",
    tag: "Community",
  },
  {
    id: "gal-7",
    title: "LiDAR SLAM Autonomous Navigation Test",
    category: "Hardware Labs",
    date: "July 2025",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
    caption: "Testing 2D point-cloud mapping using RPLIDAR A1 and ROS2 navigation stack nodes.",
    tag: "Autonomous Systems",
  },
  {
    id: "gal-8",
    title: "National Trophy Handover Ceremony",
    category: "Team & Events",
    date: "December 2025",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85",
    caption: "Honoring our winning teams with University Vice Chancellor and CSE Department Chairs.",
    tag: "Victory",
  },
  {
    id: "gal-9",
    title: "CAD & 3D Prototyping Workshop",
    category: "Workshops",
    date: "June 2025",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=85",
    caption: "Designing lightweight chassis mounts and motor brackets using parametric 3D modeling.",
    tag: "Rapid Prototyping",
  },
];
