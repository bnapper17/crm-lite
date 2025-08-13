"use server"

import { eq } from "drizzle-orm"
import { db } from "@/db"
import { clients } from "@/db/schema"
import { actionClient } from "@/lib/safe-action"
import { insertClientSchema, type insertClientSchemaType } from "@/zod-schemas/client"
import { flattenValidationErrors } from "next-safe-action"

export const saveClientAction = actionClient
    .metadata({ actionName: "saveClientAction" })
    .schema(insertClientSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
    })
    .action(async ({ parsedInput: client }: {parsedInput: insertClientSchemaType}) => {

        // new customer
        if(client.id === 0) {
            
            const result = await db.insert(clients).values({
                firstName: client.firstName,
                lastName: client.lastName,
                businessName: client.businessName,
                email: client.email,
                phone: client.phone,
                address1: client.address1,
                city: client.city,
                state: client.state,
                zip: client.zip,
                notes: client.notes,
                archived: false,
                chipClient: client.chipClient,
                woodClient: client.woodClient
            }).returning({ insertedId: clients.id })

            return{ message: `${client.firstName} ${client.lastName} added successfully! ID: ${result[0].insertedId}`}
        }

        //update existing customer
        const result = await db.update(clients).set({
            firstName: client.firstName,
            lastName: client.lastName,
            businessName: client.businessName,
            email: client.email,
            phone: client.phone,
            address1: client.address1,
            city: client.city,
            state: client.state,
            zip: client.zip,
            notes: client.notes,
            archived: client.archived,
            chipClient: client.chipClient,
            woodClient: client.woodClient
        })
        .where(eq(clients.id, client.id!))
        .returning({ updatedId: clients.id})

        return{ message: `${client.firstName} ${client.lastName} updated successfully! ID: ${result[0].updatedId}`}
    })