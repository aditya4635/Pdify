import { Sparkles } from 'lucide-react'
import React from 'react'
import {Badge} from '@/components/ui/badge'
export default function UploadHeader(){

    return(
    <div className='flex flex-col items-center justify-center gap-6 text-center'>
        <div className='relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-purple-200 via-primary to-purple-800 animate-gradient-x group'>
        <Badge variant={'secondary'} className='relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors'>
            <Sparkles className='h-6 w-6 mr-2 text-primary animate-pulse'/>
        <p className='text-base'>AI-powered content creation</p>
        </Badge>
        </div>
        <div className='capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
        <h1 className='text-primary pb-20 pt-12'>Start uploading your PDF </h1>
        <p className='text-white '>Upload your PDF and we'll summarize it for you</p>
        </div>
      </div>)
}