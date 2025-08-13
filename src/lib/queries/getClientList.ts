import { db } from "@/db"
import { clients } from "@/db/schema"
import { eq, desc, and } from "drizzle-orm"


export async function getClientList() {
    const clientList = await db.select()
        .from(clients)
        .where(and(eq(clients.archived, false), eq(clients.chipClient, false)))
        .orderBy(desc(clients.updatedAt))

    return clientList
}
