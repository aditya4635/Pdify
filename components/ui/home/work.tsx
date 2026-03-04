"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { HOW_IT_WORKS, type Step } from '@/lib/constants';

function StepItem({ icon, title, description, index }: Step & { index: number }) {
  return (
    <motion.div
      className="relative p-8 rounded-3xl bg-gray-50 dark:bg-zinc-900 border border-transparent hover:border-gray-200 dark:hover:border-zinc-800 hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.12 }}
      viewport={{ once: true, margin: "-60px" }}
    >
      <motion.div
        className="flex items-center justify-center h-20 w-20 mb-6 rounded-2xl bg-white dark:bg-zinc-950 shadow-sm border border-gray-100 dark:border-zinc-800 text-gray-900 dark:text-gray-100"
        whileHover={{ scale: 1.12, rotate: 3 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        {icon}
      </motion.div>
      <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h4>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  );
}

const Work = () => {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-zinc-950 py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center">
        <motion.h2
          className="text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          How it works
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl mt-4 mb-16 text-gray-600 dark:text-gray-400 max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true }}
        >
          Transform any PDF into an easy to digest summary in three simple steps
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {HOW_IT_WORKS.map((step, index) => (
            <StepItem key={index} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
