"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="text-gold-gradient text-3xl md:text-4xl font-black tabular-nums">
      +{count.toLocaleString("ar-MA")}{suffix}
    </span>
  );
}

const stats = [
  { label: "تاجر نشط", value: 2000, suffix: "" },
  { label: "محادثة شهرياً", value: 50000, suffix: "" },
  { label: "نسبة الرضا", value: 98, suffix: "٪" },
  { label: "دقائق للإعداد", value: 5, suffix: "" },
];

export default function TrustBar() {
  return (
    <section className="py-16 border-y border-border relative overflow-hidden">
      <div className="absolute inset-0 shimmer" />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <Counter target={stat.value} suffix={stat.suffix} />
              <p className="text-muted text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
