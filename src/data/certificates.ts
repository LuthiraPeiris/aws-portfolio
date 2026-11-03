export type Certificate = {
  id: string;
  image: string;
};

export type CompetitionCertificate = {
  id: string;
  title: string; 
  images: string[];
  description: string;
};

/* -----------------------------
   Normal Certificates (Image Only)
------------------------------ */
export const certificates: Certificate[] = [
  {
    id: "cert-1",
    image: "/certificates/cert1.webp",
  },
  {
    id: "cert-2",
    image: "/certificates/cert2.webp",
  },
  {
    id: "cert-3",
    image: "/certificates/cert3.webp",
  },
  {
    id: "cert-4",
    image: "/certificates/cert4.webp",
  },
  {
    id: "cert-5",
    image: "/certificates/cert5.webp",
  },
  {
    id: "cert-6",
    image: "/certificates/cert6.webp",
  },
  {
    id: "cert-7",
    image: "/certificates/cert7.webp",
  },
  {
    id: "cert-8",
    image: "/certificates/cert8.webp",
  },
  {
    id: "cert-9",
    image: "/certificates/cert9.webp",
  },
  {
    id: "cert-10",
    image: "/certificates/cert10.webp",
  },
  {
    id: "cert-11",
    image: "/certificates/cert11.webp",
  },
  {
    id: "cert-12",
    image: "/certificates/cert12.webp",
  },
  {
    id: "cert-13",
    image: "/certificates/cert13.webp",
  },
  {
    id: "cert-14",
    image: "/certificates/cert14.webp",
  },
  {
    id: "cert-15",
    image: "/certificates/cert15.webp",
  },
  {
    id: "cert-16",
    image: "/certificates/cert16.webp",
  },
  {
    id: "cert-17",
    image: "/certificates/cert17.webp",
  },
  {
    id: "cert-18",
    image: "/certificates/cert18.webp",
  },
  {
    id: "cert-19",
    image: "/certificates/cert19.webp",
  },
  {
    id: "cert-20",
    image: "/certificates/cert20.webp",
  },
  {
    id: "cert-21",
    image: "/certificates/cert21.webp",
  },
  {
    id: "cert-22",
    image: "/certificates/cert22.webp",
  },
  {
    id: "cert-23",
    image: "/certificates/cert23.webp",
  },
  {
    id: "cert-24",
    image: "/certificates/cert24.webp",
  },
  {
    id: "cert-25",
    image: "/certificates/cert25.webp",
  },
  {
    id: "cert-26",
    image: "/certificates/cert26.webp",
  },
  {
    id: "cert-27",
    image: "/certificates/cert27.webp",
  },
  {
    id: "cert-28",
    image: "/certificates/cert28.webp",
  },
];

/* -----------------------------
   Competition Certificates
   (Image + Description)
------------------------------ */

export const competitionCertificates: CompetitionCertificate[] = [
  {
    id: "comp-1",
    title: "Ballerina Innovation Challenge - 2025", 
    images: ["/competition/comp1.webp"],
    description:
      "Participated in an innovation competition that required building a project using the Ballerina programming language.",
  },
  {
    id: "comp-2",
    title: "CodeMania 6.0 - 2026",
    images: [
      "/competition/comp2-1.webp",
      "/competition/comp2-2.webp",
      "/competition/comp2-3.webp",
    ],
    description:
      "Received an award in recognition of strong performance in competitive programming and effective teamwork, securing 5th place out of 80 competing teams.",
  },
  {
    id: "comp-3",
    title: "CryptX 2.0 - 2026",
    images: [
      "/competition/comp3-1.webp",
      "/competition/comp3-2.webp",
      "/competition/comp3-3.webp",
      "/competition/comp3-4.webp",
      
    ],
    description:
      "Received an award for advancing to the finals as one of the top 15 teams out of all participating teams, recognizing the team's performance and dedication throughout the competition.",
  },
  {
  id: "comp-4",
  title: "IEEE Digital Vesak Art Competition 2026",
  images: [
    "/competition/comp4-1.webp",
    "/competition/comp4-2.webp",
  ],
  description:
    "Received a certificate of participation for taking part in the IEEE Digital Vesak Art Competition 2026, demonstrating creativity, enthusiasm, and artistic talent in celebrating the spirit of Vesak through digital art.",
  },
  {
  id: "comp-5",
  title: "MoraXtreme 10.0 2025",
  images: [
    "/competition/comp5.webp",
  ],
  description:
    "Received a certificate of participation for taking part in the MoraXtreme 10.0 2025.",
  },
  {
  id: "comp-6",
  title: "SLiOT Challenge 2026",
  images: [
    "/competition/comp6.webp",
  ],
  description:
    "Received a certificate of participation for taking part in the SLiOT Challenge 2026.",
  }
  
];