import { getDbConnection } from "./db";

export async function getSummaries(userId:string|undefined){
    const sql=await getDbConnection();
    const summaries=await sql`SELECT * from pdf_summaries where user_id=${userId}   ORDER BY created_at DESC`;
    return summaries;
}

export async function getSummaryById(summaryId: string, userId: string | undefined) {
    const sql = await getDbConnection();
    const summary = await sql`
        SELECT * FROM pdf_summaries 
        WHERE id = ${summaryId} AND user_id = ${userId}
        LIMIT 1
    `;
    return summary[0] || null;
}