"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { siteConfig } from "@/data/site";
import { motion } from "framer-motion";

function GlobeCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 1000);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x4ade80, 2.8, 100);
    pointLight.position.set(6, 4, 8);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x22c55e, 1.2, 100);
    pointLight2.position.set(-6, -3, 6);
    scene.add(pointLight2);

    const sphereRadius = 2.2;

    const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 64, 64);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x03140a,
      emissive: 0x0a3d1e,
      emissiveIntensity: 0.75,
      shininess: 25,
      specular: 0x66ff99,
      transparent: true,
      opacity: 0.98,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    globeGroup.add(sphere);

    const wireGeometry = new THREE.SphereGeometry(sphereRadius + 0.01, 28, 28);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x4ade80,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const wireSphere = new THREE.Mesh(wireGeometry, wireMaterial);
    globeGroup.add(wireSphere);

    const pointsGeometry = new THREE.SphereGeometry(
      sphereRadius + 0.03,
      48,
      48
    );
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x4ade80,
      size: 0.035,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
    });
    const globePoints = new THREE.Points(pointsGeometry, pointsMaterial);
    globeGroup.add(globePoints);

    const glowGeometry = new THREE.SphereGeometry(sphereRadius + 0.2, 64, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
    });
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    globeGroup.add(glowSphere);

    const ringMaterial = new THREE.LineBasicMaterial({
      color: 0x4ade80,
      transparent: true,
      opacity: 0.22,
    });

    const ring1 = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(
        new THREE.EllipseCurve(0, 0, 3.15, 3.15, 0, Math.PI * 2, false, 0)
          .getPoints(160)
          .map((p: THREE.Vector2) => new THREE.Vector3(p.x, p.y, 0))
      ),
      ringMaterial
    );
    ring1.rotation.x = Math.PI / 2.8;
    globeGroup.add(ring1);

    const ring2Material = new THREE.LineBasicMaterial({
      color: 0x86efac,
      transparent: true,
      opacity: 0.12,
    });

    const ring2 = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(
        new THREE.EllipseCurve(0, 0, 3.45, 3.45, 0, Math.PI * 2, false, 0)
          .getPoints(160)
          .map((p: THREE.Vector2) => new THREE.Vector3(p.x, p.y, 0))
      ),
      ring2Material
    );
    ring2.rotation.y = Math.PI / 5;
    ring2.rotation.x = Math.PI / 1.9;
    globeGroup.add(ring2);

    function createMarker(
      lat: number,
      lng: number,
      color = 0x86efac,
      size = 0.07
    ) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);

      const r = sphereRadius + 0.08;

      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      const markerGeometry = new THREE.SphereGeometry(size, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 1,
      });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.set(x, y, z);

      const markerGlowGeometry = new THREE.SphereGeometry(size * 2.6, 16, 16);
      const markerGlowMaterial = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.18,
      });
      const glow = new THREE.Mesh(markerGlowGeometry, markerGlowMaterial);
      glow.position.copy(marker.position);

      globeGroup.add(marker);
      globeGroup.add(glow);

      return {
        marker,
        glow,
        markerGeometry,
        markerMaterial,
        markerGlowGeometry,
        markerGlowMaterial,
      };
    }

    const sriLanka = createMarker(7.8731, 80.7718, 0x86efac, 0.075);
    const europe = createMarker(50.1109, 8.6821, 0x4ade80, 0.055);
    const usa = createMarker(37.7749, -122.4194, 0x4ade80, 0.055);

    function createPulse(lat: number, lng: number) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const r = sphereRadius + 0.1;

      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      const pulseGeometry = new THREE.RingGeometry(0.09, 0.14, 32);
      const pulseMaterial = new THREE.MeshBasicMaterial({
        color: 0x86efac,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
      });

      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
      pulse.position.set(x, y, z);
      pulse.lookAt(new THREE.Vector3(x * 2, y * 2, z * 2));

      globeGroup.add(pulse);
      return { pulse, pulseGeometry, pulseMaterial };
    }

    const { pulse, pulseGeometry, pulseMaterial } = createPulse(
      7.8731,
      80.7718
    );

    let frameId = 0;
    let pulseScale = 1;
    let pulseOpacity = 0.8;

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      if (!clientWidth || !clientHeight) return;

      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    resize();

    const observer = new ResizeObserver(() => resize());
    observer.observe(container);

    let scrollYProgress = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      scrollYProgress = docHeight > 0 ? scrollTop / docHeight : 0;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      globeGroup.rotation.y += 0.002;

      const targetY = scrollYProgress * Math.PI * 2;
      const targetX = (scrollYProgress - 0.5) * 0.6;

      globeGroup.rotation.y += (targetY - globeGroup.rotation.y) * 0.05;
      globeGroup.rotation.x += (targetX - globeGroup.rotation.x) * 0.05;

      wireSphere.rotation.y -= 0.0012;
      globePoints.rotation.y += 0.0035;
      ring1.rotation.z += 0.0018;
      ring2.rotation.z -= 0.0012;

      pulseScale += 0.012;
      pulseOpacity -= 0.01;

      pulse.scale.set(pulseScale, pulseScale, pulseScale);
      pulseMaterial.opacity = Math.max(pulseOpacity, 0);

      if (pulseOpacity <= 0) {
        pulseScale = 1;
        pulseOpacity = 0.8;
      }

      const t = performance.now() * 0.0015;

      sriLanka.glow.scale.setScalar(1 + Math.sin(t * 2.2) * 0.18);
      europe.glow.scale.setScalar(1 + Math.sin(t * 1.8 + 1.2) * 0.12);
      usa.glow.scale.setScalar(1 + Math.sin(t * 1.6 + 2.1) * 0.12);

      globeGroup.position.y = Math.sin(t * 0.8) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);

      sphereGeometry.dispose();
      sphereMaterial.dispose();

      wireGeometry.dispose();
      wireMaterial.dispose();

      pointsGeometry.dispose();
      pointsMaterial.dispose();

      glowGeometry.dispose();
      glowMaterial.dispose();

      ring1.geometry.dispose();
      ringMaterial.dispose();

      ring2.geometry.dispose();
      ring2Material.dispose();

      sriLanka.markerGeometry.dispose();
      sriLanka.markerMaterial.dispose();
      sriLanka.markerGlowGeometry.dispose();
      sriLanka.markerGlowMaterial.dispose();

      europe.markerGeometry.dispose();
      europe.markerMaterial.dispose();
      europe.markerGlowGeometry.dispose();
      europe.markerGlowMaterial.dispose();

      usa.markerGeometry.dispose();
      usa.markerMaterial.dispose();
      usa.markerGlowGeometry.dispose();
      usa.markerGlowMaterial.dispose();

      pulseGeometry.dispose();
      pulseMaterial.dispose();

      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" />;
}

export function AboutIntroSection() {
  return (
    <section className="section">
      <div className="container-custom">
        <SectionTitle
          eyebrow="About"
          title="My journey into DevOps and cloud engineering"
          description="I’m a software engineering undergraduate growing in DevOps, cloud computing, and full-stack development. I enjoy building scalable applications, working with cloud infrastructure, and creating automated CI/CD workflows that make software delivery faster, safer, and more reliable."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          {/* LEFT CARD */}
          <div className="card relative overflow-hidden p-0 min-h-190">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-50 via-white to-cyan-50" />
            <div className="absolute -left-16 top-12 h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl" />
            <div className="absolute -right-16 bottom-10 h-48 w-48 rounded-full bg-cyan-200/40 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-10 text-center sm:px-10 sm:py-12">
              <div className="relative">
                <div className="absolute inset-0 rounded-4xl bg-emerald-400/20 blur-2xl" />

                <img
                  src="/profile/profile1.webp"
                  alt={siteConfig.name}
                  className="relative h-90 w-90 rounded-4xl bg-white object-contain shadow-2xl sm:h-107.5 sm:w-107.5 lg:h-125 lg:w-125"
                />
              </div>

              <div className="mt-8 max-w-2xl">
                <h3 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                  {siteConfig.name}
                </h3>

                <p className="mt-3 text-base font-medium text-emerald-700 sm:text-lg">
                  {siteConfig.role}
                </p>

                <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-[15px]">
                  I build practical IoT and cloud-based systems that connect the
                  physical world with modern platforms.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex min-h-190 flex-col gap-8">
            {/* TOP CARD */}
            <div className="card overflow-hidden p-0 flex-1 min-h-90">
              <div className="relative h-full rounded-[inherit] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_35%),linear-gradient(135deg,#2d2d2d_0%,#1f1f1f_45%,#111111_100%)]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[32px_32px] opacity-30" />

                <div className="relative z-10 grid h-full grid-cols-1 items-center gap-6 p-6 sm:p-8 xl:grid-cols-[minmax(0,1fr)_240px]">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-400/90">
                      Availability
                    </p>

                    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      Time Zone
                    </h3>

                    <p className="mt-4 max-w-md text-sm leading-7 text-white/75 sm:text-base">
                      I&apos;m based in Sri Lanka (GMT+5:30) and open to remote
                      opportunities and collaborations worldwide.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-sm">
                        Remote Friendly
                      </span>
                      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-300">
                        GMT +5:30
                      </span>
                    </div>
                  </div>

                  <div className="relative h-55 w-full sm:h-60 xl:h-62.5">
                    <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-3xl" />
                    <GlobeCanvas />
                  </div>
                </div>
              </div>
            </div>


            {/* BOTTOM CARD */}
            <div className="card flex-1 min-h-55 p-6 sm:p-8">
              <div className="flex h-full flex-col">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">
                    Skills
                  </p>

                  <h3 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">
                    Technologies and tools
                  </h3>
                </div>

                <div className="mt-8 max-h-55 overflow-y-auto pr-2 custom-scroll">
                  <div className="flex flex-wrap gap-3">
                    {[
                      "ESP32", "IoT Systems", "Sensors", "Firebase", "AWS",
                      "Cloud Integration", "MQTT", "APIs", "React", "JavaScript",
                      "TypeScript", "Embedded Systems", "Arduino", "System Design", "Nextjs", "Git", "Linux",
                      "Terraform"
                    ].map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.05,
                          ease: "easeOut",
                        }}
                        whileHover={{
                          y: -4,
                          scale: 1.04,
                        }}
                        className="relative cursor-default rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
                      >
                        {/* subtle floating glow */}
                        <motion.div
                          className="absolute inset-0 rounded-full bg-emerald-100/40 blur-md"
                          animate={{ opacity: [0.2, 0.5, 0.2] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.2,
                          }}
                        />

                        <span className="relative z-10">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}