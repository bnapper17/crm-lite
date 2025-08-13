ALTER TABLE "clients" ADD COLUMN "archived" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "clients" DROP COLUMN "estimate_given";