"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const metrics = [
  {
    id: 1,
    value: "4+",
    label: "Years of Experience",
    description:
      '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
  {
    id: 2,
    value: "4+",
    label: "Years of Experience",
    description:
      '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
  {
    id: 3,
    value: "4+",
    label: "Years of Experience",
    description:
      '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
  {
    id: 4,
    value: "4+",
    label: "Years of Experience",
    description:
      '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
  {
    id: 5,
    value: "4+",
    label: "Years of Experience",
    description:
      '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
];

function KeyMetrics() {
  const ref = useRef<HTMLElement>(null);

  const isInView = useInView(ref, { once: false });

  return (
    <motion.section
      id="about"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="glass px-4 py-32 text-white"
    >
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-6xl font-bold mb-12 uppercase"
        >
          Key metrics
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              className="flex flex-col"
            >
              <motion.h3
                initial={{ scale: 0.5 }}
                animate={isInView ? { scale: 1 } : { scale: 0.5 }}
                transition={{
                  delay: 0.6 + index * 0.1,
                  duration: 0.4,
                  type: "spring",
                }}
                className="text-5xl font-bold text-purple-300 mb-2"
              >
                {metric.value}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                className="text-xl font-semi-bold mb-2"
              >
                {metric.label}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                className="text-gray-400"
              >
                {metric.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default KeyMetrics;
