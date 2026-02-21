import BgGradient from "@/components/ui/home/bg-gradient";
import Hero from "@/components/ui/home/hero";
import Demo from "@/components/ui/home/demo";
import Work from "@/components/ui/home/work";
import Pricing from "@/components/ui/home/pricing";
import Ctasection from "@/components/ui/home/ctasection";
import React from "react";
export default function Home() {
  return (
   <div className="relative w-full bg-white dark:bg-zinc-950">
      <div className="flex flex-col items-center justify-center ">
      <Hero />
      <Demo / >
      <Work />
      <Pricing />
      <Ctasection />
      </div>
   </div>
  );
}
