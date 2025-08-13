import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { clients } from '@/db/schema'

export const insertClientSchema = createInsertSchema(clients, {
    firstName: (schema) => schema.min(1, "First name is required"),
    lastName: (schema) => schema.min(1, "Last name is required"),
    phone: (schema) => schema.regex(/^\d{3}-\d{3}-\d{4}$/, "Invalid phone number: use format XXX-XXX-XXXX")
})

export const selectClientSchema = createSelectSchema(clients)

export type insertClientSchemaType = typeof insertClientSchema._type
export type selectClientSchemaType = typeof selectClientSchema._type