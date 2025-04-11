"use client";

import React from "react";
import { motion } from "motion/react";

function Contact() {
  return (
    <section id="contact" className="max-w-[1200px] overflow-x-clip mx-auto px-4 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid lg:grid-cols-2 gap-16"
      >
        <div className="space-y-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-7xl font-bold text-purple-300"
          >
            Get in <span className="text-purple-500">touch</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass p-8 rounded-2xl space-y-8"
          >
            <div className="space-y-2">
              <p className="text-lg text-purple-300">Phone</p>
              <a
                href="tel:+40771654884"
                className="flex items-center gap-2 text-2xl font-semibold hover:text-purple-400 transition duration-300 "
              >
                +40 771 654 884 <span className="text-purple-500">↗️</span>
              </a>
            </div>
            <div className="space-y-2">
              <p className="text-lg text-purple-300">Email</p>
              <a
                href="mailto:catalin.catrina@outlook.com"
                className="flex items-center text-3xl lg-text-4xl font-semibold hover:text-purple-400 transition duration-300"
              >
                catalin.catrina@outlook.com{" "}
                <span className="text-purple-500">↗️</span>
              </a>
            </div>
            <div className="space-y-2">
              <p className="text-lg text-purple-300">Location</p>
              <address className="text-xl not-italic leading-relaxed">
                Timisoara, Romania
              </address>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden"
        >
          <iframe
            src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJp7UPy31nRUcRSWeTc2Svf1M&key=AIzaSyCqToKGjWXOZ-oKpu0ysssiOE02Ppp1S04"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Contact;
