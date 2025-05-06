import { db } from "@/db";
import { clients, jobs } from "@/db/schema"
import { eq, and, asc } from "drizzle-orm";

export async function getCompletedBids() {
    const results = await db.select({
        id: jobs.id,
        requestDate: jobs.createdAt,
        title: jobs.title,
        firstName: clients.firstName,
        lastName: clients.lastName,
        email: clients.email,
        phone: clients.phone,
        address1: clients.address1,
        city: clients.city,
        state: clients.state,
        zip: clients.zip,
    })
    .from(jobs)
    .leftJoin(clients, eq(jobs.clientId, clients.id))
    .where(and(eq(jobs.bidCompleted, true), eq(jobs.bidAccepted, false), eq(jobs.archived, false)))
    .orderBy(asc(jobs.createdAt))
    return results
}
