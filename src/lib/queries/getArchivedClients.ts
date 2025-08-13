import { db } from "@/db"
import { clients } from "@/db/schema"
import { eq, desc } from "drizzle-orm"


export async function getArchivedClients() {
    const archivedClients = await db.select()
        .from(clients)
        .where(eq(clients.archived, true))
        .orderBy(desc(clients.updatedAt))

    return archivedClients
}
