import { db } from "@/db"
import { jobs } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getClientJobs(id: number) {
    const clientJobs = await db.select()
        .from(jobs)
        .where(eq(jobs.clientId, id))

    return clientJobs
}
