"use server";

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
interface pdfSummaries{
    userId?:string,
    fileUrl:string,
    summary:string,
    title:string,
    fileName:string,
    cardData?:any
};
export async function generatePdfSummary(uploadResponse: Array<{
    
        serverData: {
            userId: string;
            file: {
                url: string;
                name: string;
            };
        };
    
}>)
    {
        if (!uploadResponse) {
            return{
            success: false,
            error: 'Error uploading file. Please try again with another file.',
            data: null
            };
                             }

        const {
            serverData: {
                    userId,
                    file: {
                        url:pdfUrl,
                        name:fileName
                    },
                },
            
        } = uploadResponse[0];

    if (!pdfUrl ) {
        return{
            success: false,
            error: 'Error uploading file. Please try again with another file.',
            data: null
        };
        }

    try{
      const pdfText =  await fetchAndExtractPdfText(pdfUrl);
       console.log({pdfText});

       let summaryResult;
       try{
        summaryResult = await generateSummaryFromGemini(pdfText);
        console.log({summaryResult});
       }
       
       catch(geminierror){
        console.error('gemini API failed',geminierror);
        throw new Error('Gemini API failed to generate summary')
       }

       if(!summaryResult || !summaryResult.summaryText){
          return {
            success:false,
            message: 'failed to generate summary',
            data:null,
          };
       }
       const formattedFileName =formatFileNameAsTitle(fileName);
       return {
        success:true,
        message: 'Summary generated successfully',
        data:{
            title:formattedFileName,
            summary: summaryResult.summaryText,
            cardData: summaryResult.cardData,
        },
       };


    }catch(err){
        return{
            success: false,
            error: 'Error uploading file. Please try again with another file.',
            data: null
        };
        
    }

   
}
async function savePdfSummary({userId,fileUrl,summary,title,fileName,cardData}:pdfSummaries){
    //sql statement for inserting
    try{
        const sql=await getDbConnection();
        const result = await sql`INSERT INTO pdf_summaries (
  user_id,
  original_file_url,
  summary_text,
  title,
  file_name,
  card_data
)VALUES (
  ${userId},
  ${fileUrl},
  ${summary},
  ${title},
  ${fileName},
  ${cardData ? JSON.stringify(cardData) : null}
) RETURNING *;`;
        return result[0];
    }catch(error){
        console.log('Error saving the PDF',error);
        throw error;
    }
}
export async function storePdfSummary({userId,fileUrl,summary,title,fileName,cardData}:pdfSummaries){

    //user logged in
    //savepdfsummary

    let savedSummary:any;
    try{
        const {userId} =await auth();
        if(!userId){
            return {
                success:false,
                message:'User not found',
            };
        }
        savedSummary=await savePdfSummary({userId,fileUrl,summary,title,fileName,cardData});
        if(!savedSummary){
            return {
                success:false,
                message:'Please try again, failed to save summary',
            };
        }


        
    } catch(error){
        return {
            success: false,
            message: error instanceof Error? error.message:'Error saving the PDF',
        }
    }

    //revalidate the cache
    revalidatePath(`/summaries/${savedSummary.id}`);
    return{
        success:true,
        message:'successfully saved summary',
        data:{
            id:savedSummary.id,
        }
    }
}