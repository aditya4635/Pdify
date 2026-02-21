import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
  <section className='flex flex-col items-center justify-center min-h-[60vh]'> 
     <div className='py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
    <SignIn />
    </div>
  </section>
  );
}