'use server';

import { getDbConnection } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteSummary({summaryId}:{summaryId:string}){
    try{
        const { userId } = await auth();
        
        if (!userId) {
            throw new Error('Unauthorized');
        }

        const sql = await getDbConnection();
        
        // Delete from database - only if it belongs to the user
        await sql`
            DELETE FROM pdf_summaries 
            WHERE id = ${summaryId} AND user_id = ${userId}
        `;
        
        // Revalidate the dashboard and detail pages
        revalidatePath('/dashboard');
        revalidatePath(`/summaries/${summaryId}`);
        
    } catch(error){
        console.error('Error deleting summary:', error);
        throw error;
    }
    
    // Redirect to dashboard after successful deletion
    redirect('/dashboard');
}