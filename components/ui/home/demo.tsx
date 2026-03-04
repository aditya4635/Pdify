import { Pizza } from 'lucide-react'
import React from 'react'

const Demo = () => {
  return (
    <section className='mb-0'>
        <div className='py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center justify-center space-y-6 mx-auto'>
          <Pizza className='h-8 w-8 text-black dark:text-white'/>
          <h1 className='text-3xl md:text-5xl text-gray-900 dark:text-gray-100 font-extrabold text-center tracking-tight leading-tight'>
            Watch how Pdify transforms <br className="hidden md:block" />
            <span className='text-gray-500 line-through decoration-2'>this next js pdf</span> into an easy to read summary
          </h1>
        </div>
        </div>
    </section>
  )
}

export default Demo
