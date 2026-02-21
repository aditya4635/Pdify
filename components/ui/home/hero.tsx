import React from 'react'
import { Button } from '../button'
import {  ArrowRight, Sparkles } from 'lucide-react'
import { Badge } from '../badge'
import Link from 'next/link'
const Hero = () => {
  return (
    <section className="mb-0 bg-background text-foreground">
      <div className="py-12 lg-py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
      <div className="flex flex-col items-center justify-center h-screen mb-0 ">
        <div className="mb-10 relative p-1 mt-12">
        <Badge className="flex items-center justify-center m-5 bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors text-sm font-semibold rounded-full px-4 py-2">
        <Sparkles className="h-5 w-5 mr-2 text-gray-900 dark:text-gray-100"/>
        <p>Powered by AI</p>
        </Badge>
        </div>
        <h1 className="text-5xl sm:text-7xl text-center text-gray-900 dark:text-gray-100 font-extrabold tracking-tight pt-0 px-5 container mx-auto mb-6">Transform PDF Into Concise Summary</h1>
        <h2 className="text-xl md:text-2xl pt-0 mt-0 text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">Get a beautiful summary reel of the PDF in seconds</h2>
        <Button className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 font-bold rounded-full px-8 py-6 text-lg transition-transform hover:scale-105 shadow-md">
          <Link href='/#pricing' className="flex items-center justify-center ">
          <span>Try Summy</span>
          <ArrowRight className="h-5 w-5 ml-3"/>
          </Link>
          </Button>
      </div>
      </div>
    </section>
  )
}

export default Hero
