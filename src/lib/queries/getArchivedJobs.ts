import { db } from "@/db";
import { clients, jobs } from "@/db/schema"
import { eq, desc } from "drizzle-orm";

export async function getArchivedJobs() {
    const archivedJobs = await db.select({
        id: jobs.id,
        requestDate: jobs.createdAt,
        updatedDate: jobs.updatedAt,
        title: jobs.title,
        firstName: clients.firstName,
        lastName: clients.lastName,
        businessName: clients.businessName,
        email: clients.email,
        phone: clients.phone,
        address1: clients.address1,
        city: clients.city,
        state: clients.state,
        zip: clients.zip,
    })
    .from(jobs)
    .leftJoin(clients, eq(jobs.clientId, clients.id))
    .where(eq(jobs.archived, true))
    .orderBy(desc(jobs.updatedAt))
    
    return archivedJobs
}
