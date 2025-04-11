"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "motion/react";

import projectPic1 from "@/assets/proj5.png";
import projectPic2 from "@/assets/proj6.png";
import projectPic3 from "@/assets/proj7.png";

const projects = [
  {
    id: 1,
    year: 2025,
    title: "Lorem ipsum",
    description:
      '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    image: projectPic1,
  },
  {
    id: 2,
    year: 2025,
    title: "Lorem ipsum",
    description:
      '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    image: projectPic2,
  },
  {
    id: 3,
    year: 2025,
    title: "Lorem ipsum",
    description:
      '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    image: projectPic3,
  },
];

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

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

  return (
    <motion.section
      id="portfolio"
      style={{ backgroundImage }}
      className="py-32 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-6xl font-bold mb-10">
            Selected <span className="text-purple-400">projects</span>
          </h2>
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer mb-8 group"
            >
              <p className="text-gray-400 text-xl mb-2">{project.year}</p>
              <h3
                className={`text-3xl font-semibold group-hover:text-purple-400 transition-colors duration-300 ${
                  selectedProject.id === project.id ? "text-purple-200" : ""
                }`}
              >
                {project.title}
              </h3>
              {selectedProject.id === project.id && (
                <>
                  <div className="border-b-2 border-purple-200 my-4"></div>
                  <p className="text-gray-400 transition-all duration-500 ease-in-out">
                    {project.description}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
        <Image
          src={selectedProject.image.src}
          width={800}
          height={450}
          className="rounded-xl shadow-lg transition-opacity duration-500 ease-in-out"
          alt={selectedProject.title}
        ></Image>
      </div>
    </motion.section>
  );
}

export default Portfolio;
