"use client";
import { Button } from '../button';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Ctasection = () => {
  return (
    <section className="bg-gray-50 dark:bg-zinc-900 py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center justify-center space-y-8 text-center"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="space-y-4">
            <motion.h2
              className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
            >
              Ready to save hours of reading time?
            </motion.h2>
            <motion.p
              className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            >
              Transform lengthy documents into clear, actionable insights with our AI-powered summarizer.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col gap-4 min-[400px]:flex-row"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button
              asChild
              className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 font-bold rounded-full px-8 py-6 text-lg shadow-lg"
            >
              <Link href="/#pricing" className="flex items-center justify-center">
                Get Started
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Ctasection;
