export type Volunteering = {
  id: string;
  organization: string;
  title: string;
  description: string;
  images: string[];
  duration: string; // 👈 new
};

export const volunteeringActivities: Volunteering[] = [
  {
    id: "vol-1",
    title: "Beyond the Resume",
    organization: "Rotaract Club of Sabaragamuwa University",
    description:
      "I was part of the Content Writing Team, responsible for creating and editing event-related content.",
    images: ["/volunteering/vol1.webp"],
    duration: "October 2025 - November 2025",
  },
  {
    id: "vol-2",
    title: "IEEE Day Celebration 2025",
    organization: "IEEE Student Branch of Sabaragamuwa University",
    description:
      "I served on the logistics team for the event and also participated in the singing team, which performed to entertain the audience.",
    images: ["/volunteering/vol2.webp"],
    duration: "October 2025 - November 2025",
  },
  {
    id: "vol-3",
    title: "Odyssey 2nd Installation Ceremony",
    organization: "Rotaract Club of Sabaragamuwa University",
    description:
      "I was a member of the Music Team and performed a solo song to entertain the Rotaractors.",
    images: ["/volunteering/vol3.webp"],
    duration: "December 2025 - January 2026",
  },
  {
    id: "vol-4",
    title: "SabraXtreme 3.0",
    organization: "IEEE Student Branch of Sabaragamuwa University",
    description:
      "I was a member of the Program Team for the event, contributing to its overall organization and execution.",
    images: ["/volunteering/vol4-1.webp", "/volunteering/vol4-2.webp"],
    duration: "December 2025 - January 2026",
  },
  {
    id: "vol-5",
    title: "AROHA Yoga Session",
    organization: "Rotaract Club of Sabaragamuwa University",
    description:
      "I was a member of the Caption Writing Team for the event, responsible for creating engaging and accurate captions for event-related content.",
    images: ["/volunteering/vol5.webp",],
    duration: "February 2026 - March 2026",
  },
  {
    id: "vol-6",
    title: "SpeakStorm",
    organization: "Rotaract Club of Sabaragamuwa University",
    description:
      "I served as a member of the Content Writing Team, responsible for creating and reviewing written content for the event.",
    images: ["/volunteering/vol6.webp",],
    duration: "February 2026 - March 2026",
  },
  {
    id: "vol-7",
    title: "Volunteer of the Month - March 2026",
    organization: "Rotaract Club of Sabaragamuwa University",
    description:
      "I was recognized as the Volunteer of the Month for March in appreciation of my dedication and contributions.",
    images: ["/volunteering/vol7.webp",],
    duration: "March 2026",
  },
  {
    id: "vol-8",
    title: "IndustriX 2026",
    organization: "IEEE Student Branch of Sabaragamuwa University",
    description:
      "Served as a Program Team member, responsible for managing live session screen sharing during the event. Coordinated with presenters, ensured smooth transitions, and handled technical issues to maintain a seamless session experience.",
    images: ["/volunteering/vol8-1.webp", "/volunteering/vol8-2.webp"],
    duration: "March 2026 - April 2026",
  },
  {
    id: "vol-9",
    title: "Volunteer of the Month - May 2026",
    organization: "IEEE Student Branch of Sabaragamuwa University",
    description:
      "I am incredibly honored to be recognized as the Volunteer of the Month for IndustriX! Serving as a Program Team Member has been an amazing journey of learning and collaboration. From the initial planning phases to handling on-ground execution, ensuring that key program activities run smoothly has been a highly rewarding challenge.",
    images: ["/volunteering/vol9.webp"],
    duration: "May 2026",
  },
  {
    id: "vol-10",
    title: "The Great Clean Up Campaign",
    organization: "LEO Club of Sabaragamuwa University of Sri Lanka",
    description:
      "Participated in The Great Clean Up Campaign, a collaborative community service initiative focused on creating a cleaner and greener environment. Through teamwork, dedication, and service, this campaign brought together volunteers to make a meaningful impact and contribute towards community well-being.",
    images: ["/volunteering/vol10.webp"],
    duration: "June 2026",
  },
  {
    id: "vol-11",
    title: "Sipmansala (සිප්මන්සල) 2026",
    organization: "Sabaragamuwa University of Sri Lanka",
    description:
      "Proud to have contributed to the Sipmansala seminar by Sabaragamuwa University's Faculty of Computing, conducting subject-based sessions in English, Mathematics, Science, and IT for G.C.E. O/L students.",
    images: ["/volunteering/vol11-1.webp", "/volunteering/vol11-2.webp", "/volunteering/vol11-3.webp"],
    duration: "June 2026",
  },
  {
    id: "vol-12",
    title: "Pixel Pioneers Game Jam V1.0",
    organization: "IEEE CS Student Branch Chapter of SUSL",
    description:
      "Participated in the Pixel Pioneers Game Jam V1.0, a collaborative event where participants come together to create innovative and engaging games within a limited timeframe. This experience allowed me to showcase my creativity, problem-solving skills, and teamwork abilities while contributing to the development of unique gaming experiences.",
    images: ["/volunteering/vol12.webp"],
    duration: "July 2026",
  },
];