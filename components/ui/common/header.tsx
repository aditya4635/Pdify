"use client";
import NavLink from './nav-link';
import React from 'react'
import { FileText } from 'lucide-react'

import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { ModeToggle } from '../mode-toggle';
const Header = () => {

  return (
    
    <nav className="flex justify-between py-4 px-6 items-center lg:px-8 font-sans"> 
      <div className='flex items-center'>
        <NavLink href="/" className='p-1 my-auto flex px-1 lg:px-2 text-foreground font-bold text-xl hover:opacity-80 transition-opacity'>
          <FileText size={24} className='text-primary hover:rotate-12 transform transition duration-200 ease-in-out'/>
          <span className='ml-2'>Summy</span>
        </NavLink>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex space-x-8 items-center'>
          <NavLink href="/#pricing" className='text-foreground/80 hover:text-foreground font-medium transition-colors'>Pricing</NavLink>
          <SignedIn>
            <NavLink href="/dashboard" className='text-foreground/80 hover:text-foreground font-medium transition-colors'>Your Summaries</NavLink>
          </SignedIn>
        </div>
      </div>
      <div className='flex items-center space-x-4'>
        <ModeToggle />
        <SignedIn>
          <NavLink href="/upload" className='text-foreground/80 hover:text-foreground font-medium transition-colors'>Upload a PDF</NavLink>
          <div className='text-xs font-bold px-3 py-1 rounded-full bg-black text-white dark:bg-white dark:text-black'>PRO</div>
          <UserButton afterSignOutUrl="/"/>
        </SignedIn>
        <SignedOut>
          <NavLink href="/sign-in" className='text-foreground font-medium hover:text-primary transition-colors'>Sign In</NavLink>
        </SignedOut>
      </div>
    </nav>
  )
}

export default Header
