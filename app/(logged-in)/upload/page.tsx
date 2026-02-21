import BgGradient from '@/components/ui/home/bg-gradient'
import UploadHeader from '@/components/upload/upload-header'
import UploadForm from '@/components/upload/upload-form'
import React from 'react'

const page = () => {
  return (
    <section className='min-h-screen bg-white dark:bg-zinc-950'>
    <div className='mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8'>
      <div className='flex flex-col item-center justify-center'>
      <UploadHeader />
      <UploadForm />
      </div>
    </div>
    </section>
  )
}

export default page
