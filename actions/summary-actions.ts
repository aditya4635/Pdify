'use server';

import { getDbConnection } from "@/lib/db";

export default async function deleteSummary({summaryId}:{summaryId:string}){
    try{
        const sql=await getDbConnection();
        console.log(sql); // Use the variable to pass linting
        console.log(summaryId);
        //deletefrom DB
        //REVALIDATE PATH
    } catch(error){
        console.error(error);
    }
}