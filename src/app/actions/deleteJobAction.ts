"use server"

import { eq } from "drizzle-orm"
import { db } from "@/db"
import { jobs } from "@/db/schema"
import { insertJobsSchema, type insertJobsSchemaType } from "@/zod-schemas/job"

import { actionClient } from "@/lib/safe-action"
import { flattenValidationErrors } from "next-safe-action"

export const deleteJobAction = actionClient
    .metadata({ actionName: "deleteJobAction" })
    .schema(insertJobsSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
    })
    .action(async ({ parsedInput: job }: {parsedInput: insertJobsSchemaType}) => {
        await db.delete(jobs)
        .where(eq(jobs.id, job.id!))

        return{ message: `Job id #${job.id} deleted successfully!`}
    })