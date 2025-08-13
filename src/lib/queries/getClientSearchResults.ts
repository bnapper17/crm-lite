import { db } from "@/db";
import { clients } from "@/db/schema";
import { ilike, or, sql } from "drizzle-orm";

export async function getClientSearchResults(searchText: string) {
    const results = await db.select()
        .from(clients)
        .where(or(
            ilike(clients.firstName, `%${searchText}%`),
            ilike(clients.lastName, `%${searchText}%`),
            ilike(clients.businessName, `%${searchText}%`),
            ilike(clients.phone, `%${searchText}%`),
            ilike(clients.email, `%${searchText}%`),
            ilike(clients.city, `%${searchText}%`),
            ilike(clients.zip, `%${searchText}%`),
            sql`lower(concat(${clients.firstName}, ' ', ${clients.lastName})) LIKE ${`%${searchText.toLowerCase().replace(' ', '%')}%`}`    
        ))
        .orderBy(clients.lastName)

        return results
}