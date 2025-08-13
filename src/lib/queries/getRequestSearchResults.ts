import { db } from "@/db";
import { clients, jobs } from "@/db/schema";
import { ilike, or, sql, eq, and, notExists, exists } from "drizzle-orm";

export async function getRequestSearchResults(searchText: string) {
    const results = await db.select({
        id: clients.id,
        requestDate: clients.createdAt,
        updatedDate: clients.updatedAt,
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
        .from(clients)
        .where(and
            (
                eq(clients.archived, false),
                eq(clients.chipClient, false),
                or(
                notExists(
                  db.select()
                  .from(jobs)
                  .where(eq(jobs.clientId, clients.id))
                ),
                exists(
                  db.select()
                  .from(jobs)
                  .where(and(eq(jobs.clientId, clients.id), eq(jobs.bidCompleted, false)))
                )),
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
        .orderBy(clients.updatedAt)

        return results
}