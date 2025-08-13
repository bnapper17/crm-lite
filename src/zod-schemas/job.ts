import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { jobs } from "@/db/schema";
// import { z } from "zod";

export const insertJobsSchema = createInsertSchema(jobs)

export const selectJobsSchema = createSelectSchema(jobs)

export type insertJobsSchemaType = typeof insertJobsSchema._type
export type selectJobsSchemaType =  typeof selectJobsSchema._type