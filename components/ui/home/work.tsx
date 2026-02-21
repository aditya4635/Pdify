import { BrainCircuit, FileOutput, FileText } from 'lucide-react'
import React, { ReactNode } from 'react'

type Steps ={
    icon: ReactNode;
    label:string;
    description:string;
};

const steps:Steps[] = [
    { 
        icon:<FileText size={64} strokeWidth={1.5} />,
        label:'Upload a PDF',
        description:'simply drag and drop the pdf here'
    },
    {
        icon:<BrainCircuit size={64} strokeWidth={1.5} />,
        label:'AI analysis',
        description:'our advaced ai processes and anayses you pdf instantly' 
    },
    {
        icon:<FileOutput size={64} strokeWidth={1.5} />,
        label:'Get summary',
        description:'recieve a clear summary of the page'   
    }
]







const Work = () => {
  return (
    <section className='relative overflow-hidden bg-white dark:bg-zinc-950 py-16 lg:py-24'>
    <div className='max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center'>
      <h2 className='text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100'>How it works</h2>
      <p className='text-lg md:text-xl mt-4 mb-16 text-gray-600 dark:text-gray-400 max-w-2xl'>Transform any PDF into an easy to digest summary in three simple steps</p>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
       {steps.map((step, index) => (
         <StepItem key={index} {...step} />
       ))}
      </div>
    </div>
    </section>
  )
}
function StepItem({icon,label,description}:Steps) {
    return (
        <div className='relative p-8 rounded-3xl bg-gray-50 dark:bg-zinc-900 border border-transparent hover:border-gray-200 dark:hover:border-zinc-800 hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center'>
            <div className='flex items-center justify-center h-20 w-20 mb-6 rounded-2xl bg-white dark:bg-zinc-950 shadow-sm border border-gray-100 dark:border-zinc-800 text-gray-900 dark:text-gray-100 group-hover:scale-110 transition-transform'>
                {icon}
            </div>
            <h4 className='text-xl font-bold text-gray-900 dark:text-gray-100 mb-2'>{label}</h4>
            <p className='text-gray-600 dark:text-gray-400'>{description}</p>
        </div>
    )
}
export default Work
