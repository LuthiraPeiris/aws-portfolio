"use client";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiFirebase,
  SiTailwindcss,
  SiGithub,
  SiMqtt,
  SiTerraform,
} from "react-icons/si";
import { FaCloud } from "react-icons/fa";
import type { IconType } from "react-icons";

type TechStackItem =
  | {
      name: string;
      icon: IconType;
      image?: never;
    }
  | {
      name: string;
      image: string;
      icon?: never;
    };

const techStacks: TechStackItem[] = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Firebase", icon: SiFirebase },
  { name: "Amplify", image: "/tech/amplify.svg" },
  { name: "Lambda", image: "/tech/lambda.svg" },
  { name: "S3", image: "/tech/s3.svg" },
  { name: "EC2", image: "/tech/ec2.svg" },
  { name: "DynamoDB", image: "/tech/dynamodb.svg" },
  { name: "IoT Core", image: "/tech/iot.svg" },
  { name: "VPC", image: "/tech/vpc.svg" },
  { name: "IAM", image: "/tech/iam.svg" },
  { name: "Gateway", image: "/tech/gateway.svg" },
  { name: "RDS", image: "/tech/rds.svg" },
  { name: "Bedrock", image: "/tech/bedrock.svg" },
  { name: "Location", image: "/tech/location.svg" },
  { name: "Terraform", icon: SiTerraform },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "GitHub", icon: SiGithub },
  { name: "MQTT", icon: SiMqtt },
  { name: "Cloud", icon: FaCloud },
];

const firstRow = techStacks.slice(0, 11);
const secondRow = techStacks.slice(11);

function TechBadge({ tech }: { tech: TechStackItem }) {
  const Icon = "icon" in tech ? tech.icon : null;

  return (
    <div className="group flex shrink-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 px-5 py-3 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      {Icon ? (
        <Icon className="h-5 w-5 text-slate-700 transition group-hover:text-slate-900" />
      ) : (
        <img
          src={tech.image}
          alt={tech.name}
          className="h-5 w-5 object-contain grayscale transition group-hover:grayscale-0"
        />
      )}

      <span className="text-sm font-medium text-slate-700 transition group-hover:text-slate-900">
        {tech.name}
      </span>
    </div>
  );
}

function TechRow({
  items,
  reverse = false,
}: {
  items: TechStackItem[];
  reverse?: boolean;
}) {
  return (
    <div className="w-full overflow-hidden">
      <div
        className={
          reverse
            ? "tech-marquee-reverse flex w-max items-center gap-4"
            : "tech-marquee flex w-max items-center gap-4"
        }
      >
        {[...items, ...items].map((tech, index) => (
          <TechBadge key={`${tech.name}-${index}`} tech={tech} />
        ))}
      </div>
    </div>
  );
}

export function TechStacksSection() {
  return (
    <section className="section pt-4 md:pt-6">
      <div className="container-custom">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Tech Stack
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            Technologies I build with
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            A quick look at the tools, platforms, and technologies I have used
            across my IoT, cloud, and web-based projects.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/70 px-4 py-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur md:px-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-white via-white/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-white via-white/80 to-transparent" />

          <div className="space-y-4">
            <TechRow items={firstRow} />
            <TechRow items={secondRow} reverse />
          </div>
        </div>
      </div>
    </section>
  );
}