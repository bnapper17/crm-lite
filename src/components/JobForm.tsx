"use client"

import JobFields from "@/components/JobFields";
import { insertJobsSchema, type insertJobsSchemaType, type selectJobsSchemaType } from "@/zod-schemas/job"

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { SwitchWithLabel } from "@/components/inputs/SwitchWithLabel"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useAction } from "next-safe-action/hooks"
import { saveJobAction } from "@/app/actions/saveJobAction"
import { useRouter } from "next/navigation"

import { type selectClientSchemaType } from "@/zod-schemas/client"


type Props = {
    client?: selectClientSchemaType
    job?: selectJobsSchemaType

}

export default function JobForm({ client, job }: Props) {

    const router = useRouter()

    const defaultValues: insertJobsSchemaType = {
            id: job?.id ?? 0,
            clientId: client?.id ?? 0,
            title: job?.title ?? "",
            notes: job?.notes ?? "",
            bidCompleted: job?.bidCompleted ?? false,
            bidAmount: job?.bidAmount ?? '',
            bidAccepted: job?.bidAccepted ?? false,
            completed: job?.completed ?? false,
            archived: job?.archived ?? false,
        }
    
    const form = useForm<insertJobsSchemaType>({
        mode: "onBlur",
        resolver: zodResolver(insertJobsSchema),
        defaultValues,
    })

    const {
            execute: saveJob
        } = useAction(saveJobAction, {
            onSuccess({ data }) {
                console.log(data)
                toast(data?.message)
            },
            onError({ error }) {
                console.log(error)
                toast.error("Save Failed")
            }
        })

    function submitForm(data: insertJobsSchemaType) {

            saveJob(data)
            router.push(`/dashboard/clients/${client?.id}`)
        }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitForm)}>
                <div className={job ? "" : "hidden"}>
                    <SwitchWithLabel
                        fieldTitle ="Archive Job"
                        nameInSchema ="archived"
                        className ="flex justify-end text-two"
                        isActive = {false}
                    />
                </div>
                <JobFields />
                <div>
                <Button 
                    type="submit" 
                    variant="ghost"
                    className="w-full text-two border border-one shadow-lg hover:bg-one hover:text-white active:shadow-none active:text-xs mt-4 cursor-pointer"
                >Submit
                </Button>
                </div>
            </form>
        </Form>
    )

}