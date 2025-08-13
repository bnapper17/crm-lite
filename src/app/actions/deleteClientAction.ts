"use server"

import { eq } from "drizzle-orm"
import { db } from "@/db"
import { clients } from "@/db/schema"
import { insertClientSchema, type insertClientSchemaType } from "@/zod-schemas/client"

import { actionClient } from "@/lib/safe-action"
import { flattenValidationErrors } from "next-safe-action"

export const deleteClientAction = actionClient
    .metadata({ actionName: "deleteClientAction" })
    .schema(insertClientSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
    })
    .action(async ({ parsedInput: client }: {parsedInput: insertClientSchemaType}) => {
        await db.delete(clients)
        .where(eq(clients.id, client.id!))

        return{ message: `client id #${client.id} deleted successfully!`}
    })