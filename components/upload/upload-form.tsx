"use client";

import React, { useRef, useState } from 'react'
import UploadFormInput from './upload-form-input'
import {z} from 'zod'
import { useUploadThing } from '@/utils/upload.thing';
import { toast } from 'sonner';
import {generatePdfSummary, storePdfSummary} from '@/actions/upload-actions';
import { setMaxIdleHTTPParsers } from 'http';

import { useRouter } from 'next/navigation';


const schema = z.object({
    file: z
    .instanceof(File,{message: 'Invalid file'})
    .refine((file) => file.size <= 24*1024*1024,  'File size must be less than 20MB ')
    .refine((file) => file.type.startsWith('application/pdf'), 'File must be a PDF')
});


export default function UploadForm() {
    const [isLoading,setIsLoading]=useState(false);
    const formRef =useRef<HTMLFormElement>(null);
    const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
        onClientUploadComplete: () => {
          toast.dismiss("upload-toast");
          toast.success("File uploaded successfully!");
        },
        onUploadError: (err) => {
          toast.dismiss("upload-toast");
          toast.error("Error occurred while uploading file. Please try again with another file.");
        },
        onUploadBegin: (file: string) => {
          console.log("upload has begun for", file);
          toast.loading("Uploading file. Please wait our AI is reading through your pdf...", {
            id: "upload-toast"
          });
        },
      });
    const router=useRouter();
    const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      setIsLoading(true);
      
      const formData = new FormData(e.currentTarget);
      const file = formData.get('file') as File ;
      
  
  
      //validation of the fields
      const validatedFields = schema.safeParse({ file });
  
      if (!validatedFields.success) {
      toast(validatedFields.error.errors[0].message);
      setIsLoading(false);
      return;
      }
      //upload the pdf to upload pdf
      const resp = await startUpload([file])
      if (!resp || resp.length === 0) {
        toast.error('Error uploading file. Please try again with another file.')
        setIsLoading(false);
        return;
      }
      
      console.log('Upload response:', resp);
      //parse the pdf using langchain 
  
      const result = await generatePdfSummary(resp.map(r=>r.serverData));
      
      const {data=null, message=null} = result || {};
  
      if (data){
        let storeResult:any;
        toast.loading(
          "Hang tight! we are saving..",
        );
  
        
        if(data.summary){
          storeResult=await storePdfSummary({
            fileUrl:resp[0].serverData.serverData.file.url,
            summary:data.summary,
            title:data.title,
            fileName:file.name
          });

          toast.success('Summary Saved');
          formRef.current?.reset();
          router.push(`/summaries/${storeResult.id}`);
        }
      }
    }
    catch(error){
      setIsLoading(false);
      console.error('error occured',error);
      formRef.current?.reset();
    }finally{
      setIsLoading(false);
    }
    
    //summarise the pdf
    // save the summary to the database
    //redirect to the [id] summary page
};
    return (

    <div className='flex flex-col items-center justify-center w-full max-w-2xl mx-auto'>
    <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit} />
    </div>
  );
}