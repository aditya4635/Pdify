import { Sparkles } from 'lucide-react'
import React from 'react'
import {Badge} from '@/components/ui/badge'
export default function UploadHeader(){

    return(
    <div className='flex flex-col items-center justify-center gap-6 text-center'>
        <div className='relative mt-12'>
        <Badge className='relative px-6 py-2 text-sm font-semibold bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors'>
            <Sparkles className='h-5 w-5 mr-3 text-gray-900 dark:text-gray-100'/>
        <p>AI-powered content creation</p>
        </Badge>
        </div>
        <div className='capitalize text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-8'>
        <h1 className='text-gray-900 dark:text-gray-100 mb-6'>Transform your PDF</h1>
        <p className='text-xl text-gray-500 dark:text-gray-400 font-normal lowercase first-letter:capitalize'>Upload your document and we'll summarize it for you instantly.</p>
        </div>
      </div>)
}