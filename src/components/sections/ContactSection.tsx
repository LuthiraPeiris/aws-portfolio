"use client";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { Mail } from "lucide-react";
import { siteConfig } from "@/data/site";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

export function ContactSection() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);

    try {
      await emailjs.sendForm(
        "service_vb0wx9o",   // 🔹 replace
        "template_b14dfxv",  // 🔹 replace
        formRef.current,
        "QD5PrJf_aKkeGv3EE"    // 🔹 replace
      );

      setSuccess(true);
      formRef.current.reset();

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container-custom">
        <div className="grid gap-8 md:grid-cols-2 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          
          {/* Left */}
          <div>
            <SectionTitle
              eyebrow="Contact"
              title="Let’s connect"
              description="Feel free to reach out for collaborations, internship opportunities, or discussions around DevOps, cloud engineering, CI/CD, full-stack development, and IoT-based solutions."
            />

            <div className="mt-6 flex items-center gap-2 text-slate-600">
              <Mail className="w-4 h-4" />
              <span>{siteConfig.email}</span>
            </div>
          </div>

          {/* Right - Form */}
          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              name="user_name"
              placeholder="Your name"
              required
              className="px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-slate-300"
            />

            <input
              type="email"
              name="user_email"
              placeholder="Your email"
              required
              className="px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-slate-300"
            />

            <textarea
              rows={5}
              name="message"
              placeholder="Your message"
              required
              className="px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-slate-300"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-semibold hover:-translate-y-0.5 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {/* Success message */}
            {success && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-emerald-600 font-medium"
              >
                Message sent successfully 🚀
              </motion.p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}