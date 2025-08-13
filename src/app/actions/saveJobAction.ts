"use server"

import { eq } from "drizzle-orm"
import { db } from "@/db"
import { jobs } from "@/db/schema"
import { insertJobsSchema, type insertJobsSchemaType } from "@/zod-schemas/job"

import { actionClient } from "@/lib/safe-action"
import { flattenValidationErrors } from "next-safe-action"

export const saveJobAction = actionClient
    .metadata({ actionName: "saveJobAction" })
    .schema(insertJobsSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
    })
    .action(async ({ parsedInput: job }: {parsedInput: insertJobsSchemaType}) => {

        // new customer
        if(job.id === 0) {
            const result = await db.insert(jobs).values({
                title: job.title,
                clientId: job.clientId,
                notes: job.notes,
                bidAmount: job.bidAmount,
                bidCompleted: job.bidAmount ? true : false,
                bidAccepted: job.bidAccepted,
                completed: job.completed,
                archived: false,

            }).returning({ insertedId: jobs.id })

            return{ message: `Job Id #${result[0].insertedId} added successfully!`}
        }

        //update existing customer
        const result = await db.update(jobs).set({
            title: job.title,
            clientId: job.clientId,
            notes: job.notes,
            bidAmount: job.bidAmount,
            bidCompleted: job.bidAmount ? true : false,
            bidAccepted: job.bidAccepted,
            completed: job.completed,
            archived: job.archived,
        })
        .where(eq(jobs.id, job.id!))
        .returning({ updatedId: jobs.id})

        return{ message: `Job id #${result[0].updatedId} updated successfully!`}
    })