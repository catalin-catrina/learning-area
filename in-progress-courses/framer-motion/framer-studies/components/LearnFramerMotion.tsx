"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

const fadeVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const listContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const listItemVariant = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const buttonStateVariant = {
  rest: { scale: 1, backgroundColor: "#0070f3" },
  hover: { scale: 1.1, backgroundColor: "#005bb5" },
  tap: { scale: 0.95, backgroundColor: "#003f7f" },
};

const modalVariant = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
};

function LearnFramerMotion() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* use motion.<htmlElement> for elements you want to animate
    define tailwind classes in className or inline css in styles={{}} for static styles
    define animations using initial and animate, where initial is the initial value, and animate represents the end state */}
      <motion.div
        className="w-[200px] h-[200px] flex justify-center items-center bg-gray-900"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        How to use motion elements
      </motion.div>

      {/* 
        1. Variants help separate state definitions from component structure 
        2. You can now reuse this variant for another motion elements
      */}
      <motion.div
        variants={fadeVariant}
        initial="hidden"
        animate="visible"
        transition={{ duration: 2 }}
        className="w-[200px] h-[200px] flex justify-center items-center bg-amber-700"
      >
        How to use variants
      </motion.div>

      {/* 
        3. Variants are also used for animating the same properties differently for parent and child
          - here, motion.li variant overwrites the parent's variant 
      */}
      <motion.ul
        variants={listContainerVariant}
        initial="hidden"
        animate="visible"
        transition={{ duration: 4 }}
        className="list-none m-0 p-0"
      >
        {[1, 2, 3].map((item) => (
          <motion.li
            key={item}
            variants={listItemVariant}
            className="text-xl text-gray-200"
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>

      {/* 4. Variants can also manage interactivity / states */}
      <motion.button
        variants={buttonStateVariant}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        transition={{ type: "spring", stiffness: 300 }}
        className="mt-4 px-8 py-4 cursor-pointer text-2xl text-gray-200 rounded-xl"
      >
        Check this out
      </motion.button>

      {/* Building a modal */}
      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setModalOpen(true)}
        className="block m-8 rounded-3xl px-8 py-3 bg-gray-400 text-center text-2xl text-black"
      >
        Open modal
      </motion.button>
      {modalOpen ? (
        <motion.div
          variants={modalVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/70"
        >
          <motion.div className="w-[600px] h-[400px] flex flex-col justify-center items-center text-2xl text-gray-100 border rounded-2xl">
            <h3>My awesome modal</h3>
            <button
              onClick={() => setModalOpen(false)}
              className="m-8 rounded-3xl px-8 py-3 bg-gray-400 text-center text-2xl text-black"
            >
              Close modal
            </button>
          </motion.div>
        </motion.div>
      ) : (
        ""
      )}
    </>
  );
}

export default LearnFramerMotion;
