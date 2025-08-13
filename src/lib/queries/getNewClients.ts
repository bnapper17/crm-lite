import { db } from "@/db"
import { clients, jobs } from "@/db/schema"
import { eq, or, and, notExists, exists } from "drizzle-orm"


export async function getNewClients() {
    const newClients = await db.select()
        .from(clients)
        .where(and(eq(clients.archived, false), eq(clients.chipClient, false), eq(clients.woodClient, false),            
            or(notExists(
            db.select()
                .from(jobs)
                .where(eq(jobs.clientId, clients.id))
            ), exists(
                db.select()
                    .from(jobs)
                    .where(and(eq(jobs.clientId, clients.id),
                        eq(jobs.bidCompleted, false), eq(jobs.archived, false)))
            )
        ))
    )
        .orderBy(clients.updatedAt)

    return newClients
    
}
