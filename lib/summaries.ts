import { getDbConnection } from "./db";
import { Summary } from "@/types";

export async function getSummaries(userId: string | undefined): Promise<Summary[]> {
    const sql = await getDbConnection();
    const summaries = await sql`SELECT * from pdf_summaries where user_id=${userId} ORDER BY created_at DESC`;
    return summaries as unknown as Summary[];
}

export async function getSummaryById(summaryId: string, userId: string | undefined): Promise<Summary | null> {
    const sql = await getDbConnection();
    const summary = await sql`
        SELECT * FROM pdf_summaries 
        WHERE id = ${summaryId} AND user_id = ${userId}
        LIMIT 1
    `;
    return (summary[0] as unknown as Summary) || null;
}