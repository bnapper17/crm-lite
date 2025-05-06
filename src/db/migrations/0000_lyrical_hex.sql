CREATE TABLE "clients" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"email" varchar,
	"phone" varchar NOT NULL,
	"address_1" varchar,
	"city" varchar,
	"state" varchar(2),
	"zip" varchar(10),
	"notes" text,
	"archived" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_id" integer NOT NULL,
	"bid_completed" boolean DEFAULT true NOT NULL,
	"bid_amount" varchar,
	"bid_accepted" boolean DEFAULT false NOT NULL,
	"title" varchar NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"archived" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;