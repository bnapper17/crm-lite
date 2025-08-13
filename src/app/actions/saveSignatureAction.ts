"use server"

// import { z } from 'zod';
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { jobs } from "@/db/schema"

import { actionClient } from "@/lib/safe-action"
import { updateSignatureSchema } from '@/zod-schemas/signature';

// Previously: Used insertJobsSchema, which likely included all job fields, and expected a full job object.
// Change: Replaced with a specific schema for jobId and signatureDataUrl to match the requirement of only needing these two fields.
// Purpose: Reduces validation overhead, ensures only required data is sent, and validates jobId as a number and signatureDataUrl as a valid image data URL.
// const updateSignatureSchema = z.object({
//   jobId: z.number().int().positive('Invalid job ID'),
//   signatureDataUrl: z.string().min(1, 'Signature data URL is required').startsWith('data:image/', 'Invalid signature data URL format'),
// });

export const saveSignatureAction = actionClient
  .metadata({ actionName: 'saveSignatureAction' })
  // Previously: Used insertJobsSchema directly in the schema method.
  // Change: Updated to use the new updateSignatureSchema.
  // Purpose: Ensures the action only validates jobId and signatureDataUrl, aligning with the requirement.
  .schema(updateSignatureSchema)
  // Previously: Destructured parsedInput as a full job object with job.id! and job.signature.
  // Change: Destructured to { jobId, signatureDataUrl } to match the new schema.
  // Purpose: Simplifies the action to only process the required fields, avoiding unnecessary data.
  .action(async ({ parsedInput: { id, signature } }) => {
    // Previously: No try-catch block or job existence check.
    // Change: Added try-catch and a check for result.length === 0 to handle missing jobs.
    // Purpose: Improves error handling by catching database errors and ensuring the job exists before returning a success message.
    try {
      const result = await db
        .update(jobs)
        .set({ signature: signature })
        .where(eq(jobs.id, id))
        .returning({ updatedId: jobs.id });

      if (result.length === 0) {
        throw new Error('Job not found');
      }

      return { message: `Signature accepted for Job #${result[0].updatedId}` };
    } catch (error) {
      console.error('Error updating signature:', error);
      throw new Error('Failed to save signature');
    }
  });