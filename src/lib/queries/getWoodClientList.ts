import { db } from "@/db"
import { clients } from "@/db/schema"
import { eq, and } from "drizzle-orm"


export async function getWoodClientList() {
    const clientList = await db.select()
        .from(clients)
        .where(and(eq(clients.archived, false), eq(clients.woodClient, true)))
        .orderBy(clients.updatedAt)

    return clientList
}
