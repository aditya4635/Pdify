import React from 'react'

const Footer = () => {
  return (
    <div className='w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6 mt-12'>
      <div className='container mx-auto px-6 text-center text-sm text-foreground/60'>
        <p>&copy; {new Date().getFullYear()} Adiya. All rights reserved.</p>
      </div>
    </div>
  )
}
export default Footer
