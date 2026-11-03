export type Project = {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  images?: string[];
  featured: boolean;
  isIoT: boolean;
  showInSelected: boolean;
  showInAll: boolean;
  showInIoT: boolean;
  tags: string[];
  github: string;
  live?: string;
};

export const projects: Project[] = [
  {
    id: "focusflow",
    title: "FocusFlow",
    category: "IoT Device Project",
    shortDescription:
      "A smart study timer device with cloud sync and productivity tracking.",
    fullDescription:
      "FocusFlow is an IoT productivity device designed to help students stay focused. It integrates a physical timer with cloud-based tracking. Users can start, pause, and stop sessions using hardware buttons while syncing session data to a mobile app. The system generates productivity insights and daily summaries, bridging hardware simplicity with cloud intelligence.",
    image: "/projects/focusflow.webp",
    images: [
      "/projects/focusflow.webp",
    ],
    featured: true,
    isIoT: true,
    showInSelected: true,
    showInAll: false,
    showInIoT: true,
    tags: ["ESP32", "Firebase", "Flutter", "IoT"],
    github: "https://github.com/your-username/focusflow",
  },
  {
    id: "labourx-system",
    title: "LabourX | Construction Technician Marketplace",
    category: "Cloud Web Platform",
    shortDescription:
      "A platform connecting students with coaches using a web platform",
    fullDescription:
      "Built LabourX, a construction technician marketplace for Sri Lanka that connects homeowners and project owners with skilled professionals through location-based search, portfolio-first profiles, job posts, structured bidding, ratings, and reviews.",
    image: "/projects/labourx.webp",
    images: [
      "/projects/labourx.webp",
    ],
    featured: true,
    isIoT: false,
    showInSelected: true,
    showInAll: true,
    showInIoT: false,
    tags: ["React", "TypeScript", "Firebase Authentication", "Firestore", "Firebase Storage", "TailwindCSS", "AWS Location Service"],
    github: "https://github.com/LuthiraPeiris/labourx",
    live: "https://main.d2jk32knhj53jq.amplifyapp.com/",
  },
  // {
  //   id: "puresense",
  //   title: "PureSense",
  //   category: "IoT + Edge Intelligence",
  //   shortDescription:
  //     "A handheld water quality monitor with temperature-aware analysis.",
  //   fullDescription:
  //     "PureSense is a compact IoT device designed to detect water filter performance using temperature-aware conductivity analysis. It follows a structured measurement flow and provides clear GOOD/WARNING/UNSAFE results. The device operates offline with optional mobile connectivity, focusing on real-world usability and safety awareness.",
  //   image: "/projects/puresense.jpg",
  //   images: [
  //     "/projects/puresense.jpg",
  //     "/projects/puresense-2.jpg",
  //     "/projects/puresense-3.jpg",
  //   ],
  //   featured: true,
  //   isIoT: true,
  //   showInSelected: true,
  //   showInAll: true,
  //   showInIoT: true,
  //   tags: ["ESP32", "Sensors", "OLED", "Edge Computing"],
  //   github: "https://github.com/your-username/puresense",
  // },
  {
    id: "management-system",
    title: "University Sports Management System",
    category: "Cloud Web Platform",
    shortDescription:
      "A platform connecting students with coaches using a web platform",
    fullDescription:
      "A web-based platform built with HTML, CSS, JavaScript, TailwindCSS, Bootstrap 5, PHP, and MySQL to streamline university sports operations. The system enables students to explore sports, view coaches, register for activities, book facilities, and stay updated on events, while coaches can manage teams, schedules, and announcements efficiently.",
    image: "/projects/sports.webp",
    images: [
      "/projects/sports.webp",
      "/projects/sports-2.webp",
      "/projects/sports-3.webp",
    ],
    featured: true,
    isIoT: false,
    showInSelected: true,
    showInAll: true,
    showInIoT: false,
    tags: ["React", "PHP", "MySQL", "TailwindCSS", "Bootstrap"],
    github: "https://github.com/LuthiraPeiris/sports-management-system",
    live: "https://your-live-demo-link.com",
  },
  // {
  //   id: "mqtt-demo",
  //   title: "MQTT Telemetry Demo",
  //   category: "IoT Communication",
  //   shortDescription:
  //     "A real-time communication demo using MQTT between devices and backend.",
  //   fullDescription:
  //     "This project demonstrates real-time communication using MQTT protocol. It includes publishing sensor data from ESP32 devices and subscribing to commands from a backend system. The goal was to understand event-driven IoT architecture and message-based communication.",
  //   image: "/projects/mqtt.jpg",
  //   images: [
  //     "/projects/mqtt.jpg",
  //     "/projects/mqtt-2.jpg",
  //     "/projects/mqtt-3.jpg",
  //   ],
  //   featured: false,
  //   isIoT: true,
  //   showInSelected: false,
  //   showInAll: true,
  //   showInIoT: true,
  //   tags: ["MQTT", "ESP32", "PubSubClient"],
  //   github: "https://github.com/your-username/mqtt-demo",
  // },
];