import { pgTable, serial, varchar, boolean, timestamp, integer, text } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"


export const clients = pgTable("clients", {
    id: serial("id").primaryKey(),
    firstName: varchar("first_name").notNull(),
    lastName: varchar("last_name").notNull(),
    businessName: varchar("business_name"),
    email: varchar("email"),
    phone: varchar("phone").notNull(),
    address1: varchar("address_1"),
    city: varchar("city"),
    state: varchar("state", { length: 2}),
    zip: varchar("zip", { length: 10 }),
    notes: text("notes"),
    archived: boolean("archived").notNull().default(false),
    chipClient: boolean("chip_client").notNull().default(false),
    woodClient: boolean("wood_client").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date())
})

export const jobs = pgTable("jobs", {
    id: serial("id").primaryKey(),
    clientId: integer("client_id").notNull().references(() => clients.id),
    bidCompleted: boolean("bid_completed").notNull().default(true),
    bidAmount: varchar("bid_amount"),
    bidAccepted: boolean("bid_accepted").notNull().default(false),
    title: varchar("title").notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
    completed: boolean("completed").notNull().default(false),
    archived: boolean("archived").notNull().default(false),
    bidDate: timestamp("bid_date"),
    acceptedDate: timestamp("accepted_date"),
    completedDate: timestamp("completed_date"),
    signature: text('signature')
})

//table relations
export const clientsRelations = relations(clients, 
    ({many}) => ({
        jobs: many(jobs)
    })
)

export const jobsRelations = relations(jobs, 
    ({ one }) => ({
        client: one(clients, {
            fields: [jobs.clientId],
            references: [clients.id]
        })
    })
)