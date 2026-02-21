"use client";

import { forwardRef } from 'react';
import {Button} from '../ui/button'
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export const UploadFormInput= forwardRef<HTMLFormElement,UploadFormInputProps>(({ onSubmit,isLoading }, ref)=> {
  return (
    <div className='container mt-12'>
        <form ref={ref} className='flex flex-col items-center justify-center' onSubmit={onSubmit}>
            <div className='flex flex-col md:flex-row items-center justify-center gap-4 w-full'>
            <Input id='file' name='file' type='file' className={cn('h-14 w-full bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-gray-100 rounded-2xl file:bg-gray-100 dark:file:bg-zinc-800 file:border-0 file:rounded-xl file:px-4 file:h-10 file:mt-1.5 file:font-semibold cursor-pointer', isLoading && 'opacity-50 cursor-not-allowed')} accept='application/pdf' required 
            disabled={isLoading} />
            <Button disabled={isLoading} className='h-14 px-8 rounded-2xl bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-gray-200 font-bold transition-all w-full md:w-auto shadow-sm'>{isLoading? <><Loader2 className='mr-2 h-5 w-5 animate-spin'/>
            Processing...</> : 'Upload PDF'}</Button>
            </div>
        </form>
    </div>
  );
});
UploadFormInput.displayName ='UploadFormInput';

export default UploadFormInput;


