"use client";

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";
import { useEffect } from "react";
import Image from "next/image";

import profilePic from "@/assets/profilepic.png";
import squareIcon from "@/assets/obj1.png";
import { FiArrowRight } from "react-icons/fi";

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

function Hero() {
  const color = useMotionValue(COLORS[0]);

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  });

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative grid min-h-screen place-content-center overflow-hidden px-4 py-24 text-gray-200"
    >
      <div className="z-10 flex flex-col items-center">
        <span className="inline-block mb-6 rounded-full px-7 py-2.5 bg-gray-600/50 text-sm">
          Open for work
        </span>
        <h1 className="text-wite/40 text-5xl md:text-7xl font-black">Hi, I am</h1>
        <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text font-black leading-tight text-transparent text-5xl md:text-7xl">
          Catalin Catrina
        </h1>
        <div>
          <Image src={profilePic} width={250} alt="profile picture" />
        </div>
        <div className="flex justify-center items-center gap-2 mb-4 rounded-3xl p-3 bg-white/10 shadow-xl">
          <Image
            src={squareIcon}
            width={30}
            className="rounded-2x mx-auto"
            alt="square icon"
          />
        </div>

        <p className="my-6 max-w-xl md:text-lg text-center">
          Frontend Developer based in Romania, with over 4 years of experience
        </p>
        <motion.button
          style={{ border, boxShadow }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.985 }}
          className="flex w-fit items-center gap-2 rounded-full px-4 py-2"
        >
          Check out my CV
          <FiArrowRight />
        </motion.button>
      </div>

      <div className="bg-circle-container">
        <div className="bg-circle-background"></div>
        <div className="bg-circle"></div>
      </div>
    </motion.section>
  );
}

export default Hero;
