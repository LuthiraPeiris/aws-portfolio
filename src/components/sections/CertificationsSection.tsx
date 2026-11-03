"use client";

import { useState } from "react";
import { certificates } from "@/data/certificates";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";

export function CertificationsSection() {
  const [showAll, setShowAll] = useState(false);

  const initialCount = 4;

  const sortedCertificates = [...certificates].sort((a, b) => {
    const idA = parseInt(String(a.id).replace(/\D/g, ""), 10);
    const idB = parseInt(String(b.id).replace(/\D/g, ""), 10);
    return idB - idA;
  });

  const visible = showAll
    ? sortedCertificates
    : sortedCertificates.slice(0, initialCount);

  const hasMore = sortedCertificates.length > initialCount;

  return (
    <section className="section">
      <div className="container-custom">
        <SectionTitle
          eyebrow="Certifications"
          title="My certifications"
          description="A collection of certifications that reflect my continuous learning in IoT, cloud, and software development."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm overflow-hidden"
            >
              <div className="aspect-3/2 w-full bg-slate-100 rounded-2xl overflow-hidden">
                <img
                  src={cert.image}
                  alt="Certificate"
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-900"
            >
              {showAll
                ? "Show Less"
                : `See More (${sortedCertificates.length - initialCount} more)`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}