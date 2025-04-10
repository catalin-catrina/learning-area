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

  return <motion.section ref={ref} >

  </motion.section>;
}

export default KeyMetrics;
