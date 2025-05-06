import { db } from "@/db"
import { clients } from "@/db/schema"
import { eq, desc } from "drizzle-orm"


export async function getClientList() {
    const clientList = await db.select()
        .from(clients)
        .where(eq(clients.archived, false))
        .orderBy(desc(clients.updatedAt))

    return clientList
}
