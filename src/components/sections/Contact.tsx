"use client";

import { useEffect, useRef, useState } from "react";
import { getCalApi } from "@calcom/embed-react";
import { motion, useInView } from "framer-motion";
import { Copy, Check, Mail, Calendar } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/SocialIcons";
import MagneticButton from "@/components/ui/MagneticButton";
import { config } from "@/data/config";
import { fadeUp, staggerContainer } from "@/lib/motion";

/** "https://cal.com/handle/event" → "handle/event" for the embed API */
const calLink = config.bookingUrl?.replace(/^https:\/\/cal\.com\//, "");

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [copied, setCopied] = useState(false);

  // Preload the Cal popup embed, themed to match the site
  useEffect(() => {
    if (!calLink) return;
    (async () => {
      const cal = await getCalApi({ namespace: "booking" });
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: { dark: { "cal-brand": "#8B5CF6" }, light: { "cal-brand": "#8B5CF6" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(config.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Fallback: open mailto */
      window.location.href = `mailto:${config.email}`;
    }
  };

  const socials = [
    config.socials.github && {
      href: config.socials.github,
      Icon: GithubIcon,
      label: "GitHub",
    },
    config.socials.linkedin && {
      href: config.socials.linkedin,
      Icon: LinkedinIcon,
      label: "LinkedIn",
    },
    config.socials.twitter && {
      href: config.socials.twitter,
      Icon: XIcon,
      label: "Twitter / X",
    },
  ].filter(Boolean) as Array<{ href: string; Icon: typeof GithubIcon; label: string }>;

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="max-w-xl mx-auto text-center" ref={ref}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {config.openToWork && (
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.2)",
                }}
                variants={fadeUp}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-small font-medium" style={{ color: "#10B981" }}>
                  Open to opportunities
                </span>
              </motion.div>
            )}

            <motion.h2 className="text-display mb-4" variants={fadeUp}>
              Let&apos;s build something.
            </motion.h2>

            <motion.p className="text-lead mb-10" variants={fadeUp}>
              Open to full-time roles and freelance work.
              Reach out, I read every message.
            </motion.p>

            {/* Email block */}
            <motion.div
              className="card p-6 mb-8 flex items-center justify-between gap-4"
              variants={fadeUp}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Mail size={18} style={{ color: "var(--accent-violet)", flexShrink: 0 }} />
                <span
                  className="font-mono text-small truncate"
                  style={{ color: "var(--text-primary)" }}
                >
                  {config.email}
                </span>
              </div>
              <button
                onClick={copyEmail}
                className="flex items-center gap-2 btn-secondary text-sm px-3 flex-shrink-0 min-h-11"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check size={14} style={{ color: "#10B981" }} />
                    <span style={{ color: "#10B981" }}>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy
                  </>
                )}
              </button>
            </motion.div>

            {/* Booking CTA — opens the Cal.com popup over the page */}
            {calLink && (
              <motion.div className="flex justify-center mb-8" variants={fadeUp}>
                <MagneticButton
                  className="btn-primary"
                  data-cal-namespace="booking"
                  data-cal-link={calLink}
                  data-cal-config='{"layout":"month_view","theme":"dark"}'
                >
                  <Calendar size={15} /> Book a 15-min intro
                </MagneticButton>
              </motion.div>
            )}

            {/* Social links */}
            <motion.div className="flex justify-center gap-4" variants={fadeUp}>
              {socials.map(({ href, Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--surface-border)",
                    color: "var(--text-secondary)",
                  }}
                  whileHover={{
                    y: -3,
                    borderColor: "rgba(139,92,246,0.4)",
                    color: "var(--accent-violet)",
                  }}
                  aria-label={label}
                >
                  <Icon width={20} height={20} />
                </motion.a>
              ))}
            </motion.div>

            {/* Aria-live region for copy feedback */}
            <div aria-live="polite" className="sr-only">
              {copied ? "Email address copied to clipboard" : ""}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
