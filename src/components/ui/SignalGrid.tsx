"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { MoveDirection, OutMode } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export function SignalGrid() {
  const [init, setInit] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: true,
        zIndex: 0,
      },
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: {
          value: 36,
          density: {
            enable: true,
            area: 900,
          },
        },
        color: {
          value: "#1e293b",
        },
        links: {
          enable: true,
          color: "#334155",
          distance: 170,
          opacity: 0.28,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.7,
          direction: MoveDirection.none,
          outModes: {
            default: OutMode.out,
          },
        },
        opacity: {
          value: 0.55,
        },
        size: {
          value: { min: 2, max: 4 },
        },
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          grab: {
            distance: 170,
            links: {
              opacity: 0.45,
            },
          },
        },
      },
    }),
    []
  );

  if (pathname === "/playground") return null;
  if (!init) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Particles
        id="tsparticles"
        options={options}
        className="absolute inset-0 h-full w-full opacity-80"
      />
    </div>
  );
}
