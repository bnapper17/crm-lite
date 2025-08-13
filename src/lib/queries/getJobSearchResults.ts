import { db } from "@/db";
import { clients, jobs } from "@/db/schema";
import { ilike, or, sql, eq, and } from "drizzle-orm";

export async function getJobSearchResults(searchText: string) {
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
        zip: clients.zip
    }

    )
        .from(jobs)
        .leftJoin(clients, eq(jobs.clientId, clients.id))
        .where(and
            (
                eq(jobs.completed, false),
                or(
                ilike(clients.firstName, `%${searchText}%`),
                ilike(clients.lastName, `%${searchText}%`),
                ilike(clients.businessName, `%${searchText}%`),
                ilike(clients.phone, `%${searchText}%`),
                ilike(clients.email, `%${searchText}%`),
                ilike(clients.city, `%${searchText}%`),
                ilike(clients.zip, `%${searchText}%`),
                sql`lower(concat(${clients.firstName}, ' ', ${clients.lastName})) LIKE ${`%${searchText.toLowerCase().replace(' ', '%')}%`}`    
                )
            )
        )
        .orderBy(clients.lastName)

        return results
}