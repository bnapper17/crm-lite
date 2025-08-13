ALTER TABLE "clients" DROP CONSTRAINT "clients_email_unique";--> statement-breakpoint
ALTER TABLE "clients" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "clients" ALTER COLUMN "address_1" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "clients" ALTER COLUMN "city" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "clients" ALTER COLUMN "state" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "clients" ALTER COLUMN "zip" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "bid_completed" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "bid_accepted" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "notes" text;