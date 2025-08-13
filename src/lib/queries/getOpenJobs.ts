import { db } from "@/db";
import { clients, jobs } from "@/db/schema"
import { eq, asc, and } from "drizzle-orm";

export async function getOpenJobs() {
    const results = await db.select({
        id: jobs.id,
        requestDate: jobs.createdAt,
        updatedDate: jobs.updatedAt,
        bidDate: jobs.bidDate,
        acceptedDate: jobs.acceptedDate,
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
        bid: jobs.bidAmount
    })
    .from(jobs)
    .leftJoin(clients, eq(jobs.clientId, clients.id))
    .where(and(eq(jobs.bidAccepted, true), eq(jobs.completed, false), eq(jobs.archived, false)))
    .orderBy(asc(jobs.acceptedDate), asc(jobs.updatedAt))
    
    return results
}
