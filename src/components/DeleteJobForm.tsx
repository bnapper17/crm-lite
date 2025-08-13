"use client"

import { insertJobsSchema, type insertJobsSchemaType, type selectJobsSchemaType } from "@/zod-schemas/job"

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useAction } from "next-safe-action/hooks"
import { deleteJobAction } from "@/app/actions/deleteJobAction"
import { useRouter } from "next/navigation"
import { useState } from "react";

import { type selectClientSchemaType } from "@/zod-schemas/client"


type Props = {
    client?: selectClientSchemaType
    job?: selectJobsSchemaType

}

export default function DeleteJobForm({ client, job }: Props) {
    const [inputValue, setInputValue] = useState('')
    const isButtonDisabled = inputValue !== job?.title

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

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
            execute: deleteJob
        } = useAction(deleteJobAction, {
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

            deleteJob(data)
            router.push(`/clients/${client?.id}`)
        }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitForm)}>
                <div>
                    <h2>{job?.title}</h2>
                    <input type="text" className="p-1 border rounded-sm" placeholder={`type '${job?.title}'`} value={inputValue} onChange={handleChange}/>
                    <Button 
                        type="submit" 
                        variant="destructive"
                        className="w-full border shadow-lg hover:text-lg active:shadow-none active:text-xs mt-4 cursor-pointer"
                        disabled={isButtonDisabled}
                    >
                        Delete
                    </Button>
                </div>
            </form>
        </Form>
    )

}