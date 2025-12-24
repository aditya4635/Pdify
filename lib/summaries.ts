import { getDbConnection } from "./db";

export async function getSummaries(userId:string|undefined){
    const sql=await getDbConnection();
    const summaries=await sql`SELECT * from pdf_summaries where user_id=${userId}   ORDER BY created_at DESC`;
    return summaries;
}