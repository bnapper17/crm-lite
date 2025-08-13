import { db } from "@/db";
import { clients, jobs } from "@/db/schema"
import { desc, eq } from "drizzle-orm";

export async function getCompletedJobs() {
    const results = await db.select({
        id: jobs.id,
        requestDate: jobs.createdAt,
        updatedDate: jobs.updatedAt,
        bidDate: jobs.bidDate,
        acceptedDate: jobs.acceptedDate,
        completedDate: jobs.completedDate,
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
    .where(eq(jobs.completed, true))
    .orderBy(desc(jobs.completedDate), desc(jobs.updatedAt))
    return results
}
