export type Article = {
  id: string;
  title: string;
  summary: string;
  image: string;
  url: string;
  publishedAt: string;
  tags: string[];
};

export const articles: Article[] = [
  {
    id: "article-1",
    title: "Host a Static Website with Amazon S3",
    summary:
      "Learn how to host a static website easily and affordably using Amazon S3, from setting up a bucket to making your site publicly accessible.",
    image: "/articles/article1.webp",
    url: "https://medium.com/@luthirapeiris1/static-website-hosted-in-the-s3-bucket-438c3157399d",
    publishedAt: "2025-08-11",
    tags: ["AWS", "S3", "Static Website"],
  },
  {
    id: "article-2",
    title: "Serverless AI Chatbot with Amazon Bedrock, Lambda, API Gateway & S3",
    summary:
      "Learn how to build a serverless AI chatbot by integrating Amazon Bedrock for AI models, Lambda for business logic, API Gateway for HTTP endpoints, and S3 for storing conversation history.",
    image: "/articles/article2.webp",
    url: "https://medium.com/@luthirapeiris1/serverless-ai-chatbot-with-amazon-bedrock-lambda-api-gateway-s3-d66bc57a6ada",
    publishedAt: "2025-08-30",
    tags: ["AWS", "Serverless", "AI"],
  },
  {
    id: "article-3",
    title: "Serverless Computing Explained Simply: A Student’s Guide to AWS",
    summary:
      "This guide breaks down serverless computing on AWS in simple terms, showing students how to run code without managing servers using services like Lambda, API Gateway, and S3.",
    image: "/articles/article3.webp",
    url: "https://medium.com/@luthirapeiris1/serverless-computing-explained-simply-a-students-guide-to-aws-393e34112aaa",
    publishedAt: "2025-09-03",
    tags: ["AWS", "Serverless", "Students"],
  },
  {
    id: "article-4",
    title: "First-time setup: Install AWS CLI and AWS SAM CLI on Windows (Beginner-friendly)",
    summary:
      "This beginner-friendly guide walks you through installing AWS CLI and AWS SAM CLI on Windows, so you can start managing AWS services and building serverless apps from your command line.",
    image: "/articles/article4.webp",
    url: "https://medium.com/@luthirapeiris1/first-time-setup-install-aws-cli-and-aws-sam-cli-on-windows-beginner-friendly-647cc9523270",
    publishedAt: "2025-10-05",
    tags: ["AWS", "CLI", "SAM"],
  },
  {
    id: "article-5",
    title: "Git Commands Made Easy: For Students Working in Teams",
    summary:
      "This guide simplifies essential Git commands for students, making it easy to collaborate, track changes, and avoid merge conflicts when working in teams.",
    image: "/articles/article5.webp",
    url: "https://medium.com/@luthirapeiris1/git-commands-made-easy-for-students-working-in-teams-2a659e38e8c8",
    publishedAt: "2025-11-01",
    tags: ["Git", "Students", "Teams"],
  },
  {
    id: "article-6",
    title: "Monolithic vs SOA vs Microservices — A Practical Guide",
    summary:
      "This practical guide breaks down the differences between monolithic, SOA, and microservice architectures, helping you choose the right approach for your project.",
    image: "/articles/article6.webp",
    url: "https://medium.com/@luthirapeiris1/monolithic-vs-soa-vs-microservices-a-practical-guide-7dd5e94859d7",
    publishedAt: "2025-11-20",
    tags: ["Architecture", "Development", "Guides"],
  },
  {
    id: "article-7",
    title: "My First Hackathon Experience: A Journey of Fun, Challenges, and Team Spirit",
    summary:
      "This article shares my first hackathon experience, including the excitement, the late night coding, the unexpected challenges, and the teamwork that made it all worthwhile.",
    image: "/articles/article7.webp",
    url: "https://medium.com/@luthirapeiris1/my-first-hackathon-experience-a-journey-of-fun-challenges-and-team-spirit-283f8dfb3f9f",
    publishedAt: "2025-12-07",
    tags: ["Hackathon", "Experience", "Teamwork"],
  },
  {
    id: "article-8",
    title: "End-to-End Automation: From Google Sheets to AI for Daily Standups",
    summary:
      "This guide shows how to automate daily standups by pulling data from Google Sheets, processing it with AI, and delivering insights through a serverless pipeline.",
    image: "/articles/article8.webp",
    url: "https://medium.com/@luthirapeiris1/end-to-end-automation-from-google-sheets-to-ai-for-daily-standups-7bf5b3cf1f7c",
    publishedAt: "2026-01-12",
    tags: ["Automation", "Google Sheets", "AI", "Standups"],
  },
  {
    id: "article-9",
    title: "7 Arduino Projects for Complete Beginners",
    summary:
      "This article presents seven easy Arduino projects to help complete beginners learn coding and electronics hands-on.",
    image: "/articles/article9.webp",
    url: "https://www.linkedin.com/pulse/7-arduino-projects-complete-beginners-luthira-peiris-f8ypc",
    publishedAt: "2026-02-10",
    tags: ["Arduino", "Beginners", "Projects"],
  },
  {
    id: "article-10",
    title: "How I Built and Deployed a Machine Learning Model as a Public API (Flask + Render)",
    summary:
      "This article walks through how I built a machine learning model and deployed it as a public API using Flask and Render.",
    image: "/articles/article10.webp",
    url: "https://medium.com/@luthirapeiris1/how-i-built-and-deployed-a-machine-learning-model-as-a-public-api-flask-render-47a12f39d6ea",
    publishedAt: "2026-02-24",
    tags: ["Machine Learning", "API", "Flask", "Render"],
  },
  {
    id: "article-11",
    title: "How I Controlled an ESP32 LED Using MQTT (Full Beginner Guide + Code)",
    summary:
      "This beginner guide walks through how to control an ESP32 LED using MQTT, complete with code and step-by-step instructions.",
    image: "/articles/article11.webp",
    url: "https://medium.com/@luthirapeiris1/how-i-controlled-an-esp32-led-using-mqtt-full-beginner-guide-code-0a80e1ef4fe6",
    publishedAt: "2026-03-23",
    tags: ["ESP32", "MQTT", "Beginner", "Code"],
  },
  {
    id: "article-12",
    title: "Understanding AWS Networking the Simple Way: VPC, Subnets, Route Tables, Internet Gateway & NAT Gateway",
    summary:
      "This article simplifies AWS networking concepts like VPC, subnets, route tables, internet gateways, and NAT gateways for easy understanding.",
    image: "/articles/article12.webp",
    url: "https://medium.com/@luthirapeiris1/understanding-aws-networking-the-simple-way-vpc-subnets-route-tables-internet-gateway-nat-2947e732a1c9",
    publishedAt: "2026-03-23",
    tags: ["AWS", "Networking", "VPC", "Subnets"],
  },
  {
    id: "article-13",
    title: "Core AWS Concepts & Services — A Practical Guide for Beginners",
    summary:
      "This practical guide introduces beginners to core AWS concepts and services, making it easy to understand cloud fundamentals.",
    image: "/articles/article13.webp",
    url: "https://medium.com/@luthirapeiris1/️-core-aws-concepts-services-a-practical-guide-for-beginners-e8d593d8ae6a",
    publishedAt: "2026-04-01",
    tags: ["AWS", "Cloud", "Beginners", "Guide"],
  },
  {
    id: "article-14",
    title: "Hosting a Static Website on AWS S3 Using Terraform",
    summary:
      "In this article, I will show you how to host a simple static website on AWS S3 using Terraform.",
    image: "/articles/article14.webp",
    url: "https://medium.com/@luthirapeiris1/hosting-a-static-website-on-aws-s3-using-terraform-b328f4fcc378",
    publishedAt: "2026-06-12",
    tags: ["AWS", "Terraform", "Beginners", "Amazon S3", "Infrastructure As Code"],
  },
  {
    id: "article-15",
    title: "Building a Complete CI/CD Pipeline with GitHub Actions, Docker Hub, and AWS EC2",
    summary:
      "In this article, I will show you how to build a complete CI/CD pipeline with GitHub Actions, Docker Hub, and AWS EC2.",
    image: "/articles/article15.webp",
    url: "https://medium.com/@luthirapeiris1/building-a-complete-ci-cd-pipeline-with-github-actions-docker-hub-and-aws-ec2-8450b1838e46?sharedUserId=luthirapeiris1",
    publishedAt: "2026-06-30",
    tags: ["AWS EC2", "DockerHub", "GitHub Actions", "CI/CD"],
  },
  {
    id: "article-16",
    title: "Building a Secure CI/CD Pipeline on AWS with Jenkins, Docker, Trivy, Docker Hub, Bastion Host, and Private EC2",
    summary:
      "I implemented an end-to-end secure CI/CD workflow that automates the containerization, vulnerability scanning, and private cloud deployment of a full-stack application using Jenkins, Docker, and AWS.",
    image: "/articles/article16.webp",
    url: "https://medium.com/@luthirapeiris1/how-i-built-a-secure-devops-pipeline-for-a-dockerized-full-stack-app-on-aws-d4f1e3eeb06b?sharedUserId=luthirapeiris1",
    publishedAt: "2026-07-01",
    tags: ["AWS EC2", "Docker", "Jenkins", "CI/CD", "Trivy", "Bastion Host", "Private EC2"],
  },
  {
    id: "article-17",
    title: "Getting Started with tmux: A Beginner’s Guide",
    summary:
      "Your friendly introduction to the terminal superpower you never knew you needed.",
    image: "/articles/article17.webp",
    url: "https://medium.com/@luthirapeiris1/getting-started-with-tmux-a-beginners-guide-8afa5b7515cd?sharedUserId=luthirapeiris1",
    publishedAt: "2026-07-02",
    tags: ["tmux", "Terminal", "Beginners", "Guide"],
  },
];