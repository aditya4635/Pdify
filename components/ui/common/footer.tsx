import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-8 mt-12'>
      <div className='container mx-auto px-6 text-center text-sm text-gray-500 dark:text-gray-400 font-medium'>
        <p>&copy; {new Date().getFullYear()} Adiya. All rights reserved.</p>
      </div>
    </footer>
  )
}
export default Footer
