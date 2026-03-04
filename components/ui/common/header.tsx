"use client";
import NavLink from './nav-link';
import React, { useState, useEffect } from 'react';
import { FileText, Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from '../mode-toggle';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 font-sans z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* 1. Left: Logo */}
          <div className="flex flex-1 items-center justify-start">
            <NavLink href="/" className='p-1 flex items-center text-foreground font-bold text-xl hover:opacity-80 transition-opacity'>
              <FileText size={24} className='text-primary hover:rotate-12 transform transition duration-200 ease-in-out'/>
              <span className='ml-2'>Pdify</span>
            </NavLink>
          </div>

          {/* 2. Center: Desktop Navigation */}
          <div className="hidden lg:flex flex-1 items-center justify-center space-x-8">
            <NavLink href="/#pricing" className='text-foreground/80 hover:text-foreground font-medium transition-colors'>Pricing</NavLink>
            <SignedIn>
              <NavLink href="/dashboard" className='text-foreground/80 hover:text-foreground font-medium transition-colors'>Your Summaries</NavLink>
            </SignedIn>
          </div>

          {/* 3. Right: Actions Group */}
          <div className="flex flex-1 items-center justify-end">
            
            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <ModeToggle />
              <SignedIn>
                <NavLink href="/upload" className='text-foreground/80 hover:text-foreground font-medium transition-colors text-sm'>Upload a PDF</NavLink>
                <div className='text-[10px] font-bold px-3 py-1 rounded-full bg-black text-white dark:bg-white dark:text-black'>PRO</div>
                <UserButton afterSignOutUrl="/"/>
              </SignedIn>
              <SignedOut>
                <NavLink href="/sign-in" className='text-foreground font-medium hover:text-primary transition-colors text-sm'>Sign In</NavLink>
              </SignedOut>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center space-x-3">
              <ModeToggle />
              <SignedIn>
                <div className='text-[10px] font-bold px-2 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black mr-1'>PRO</div>
                <UserButton afterSignOutUrl="/"/>
              </SignedIn>
              <button 
                onClick={toggleMenu}
                className="p-1.5 text-foreground rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 w-full bg-background border-b border-border/40 shadow-xl md:hidden flex flex-col p-4 space-y-2 z-40 backdrop-blur-md"
          >
             <NavLink href="/#pricing" className='block p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900 text-foreground/80 hover:text-foreground font-medium transition-colors text-lg'>Pricing</NavLink>
             <SignedIn>
               <NavLink href="/dashboard" className='block p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900 text-foreground/80 hover:text-foreground font-medium transition-colors text-lg'>Your Summaries</NavLink>
               <NavLink href="/upload" className='block p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900 text-foreground/80 hover:text-foreground font-medium transition-colors text-lg'>Upload a PDF</NavLink>
             </SignedIn>
             <SignedOut>
               <NavLink href="/sign-in" className='block p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900 text-foreground font-medium hover:text-primary transition-colors text-lg'>Sign In</NavLink>
             </SignedOut>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Header
