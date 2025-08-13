import { z } from 'zod';

export const updateSignatureSchema = z.object({
  id: z.number().int().positive('Invalid job ID'),
  signature: z.string().min(1, 'Signature data URL is required').startsWith('data:image/', 'Invalid signature data URL format'),
});

export type updateSignatureSchemaType = typeof updateSignatureSchema._type;