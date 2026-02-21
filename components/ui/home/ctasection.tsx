import { Button } from '../button'
import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const Ctasection = () => {
  return (
    <section className="bg-gray-50 dark:bg-zinc-900 py-16 lg:py-24">
    <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8' >
      <div className='flex flex-col items-center justify-center space-y-8 text-center'>
        <div className='space-y-4'>
            <h2 className='text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl'>Ready to save hours of reading time?
            </h2>
            <p className='mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-400'> Transform lengthy documents into clear, actionable insights with our AI-powered summarizer.
            </p>
        </div>
        <div className='flex flex-col gap-4 min-[400px]:flex-row'>
            <Button asChild className='bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 font-bold rounded-full px-8 py-6 text-lg transition-transform hover:scale-105 shadow-lg'>
            <Link href='/#pricing' className='flex items-center justify-center'>
                Get Started
                <ArrowRight className='h-5 w-5 ml-2'/>
            </Link>    
            </Button>
        </div>
      </div>
    </div>
    </section>
  )
}

export default Ctasection
