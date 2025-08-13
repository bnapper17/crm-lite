"use client"

import { insertClientSchema, type insertClientSchemaType, type selectClientSchemaType } from "@/zod-schemas/client"

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useAction } from "next-safe-action/hooks"
import { deleteClientAction } from "@/app/actions/deleteClientAction"
import { useRouter } from "next/navigation"
import { useState } from "react";



type Props = {
    client?: selectClientSchemaType
}

export default function DeleteJobForm({ client}: Props) {
    const [inputValue, setInputValue] = useState('')
    const isButtonDisabled = inputValue !== `${client?.firstName} ${client?.lastName}`

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const router = useRouter()

    const defaultValues: insertClientSchemaType = {
        id: client?.id ?? 0,
        firstName: client?.firstName ?? "",
        lastName: client?.lastName ?? "",
        email: client?.email ?? "",
        phone: client?.phone ?? "",
        address1: client?.address1 ?? "",
        city: client?.city ?? "",
        state: client?.state ?? "",
        zip: client?.zip ?? "",
        notes: client?.notes ?? "",
        archived: client?.archived ?? false,
    }
    
    const form = useForm<insertClientSchemaType>({
            mode: "onBlur",
            resolver: zodResolver(insertClientSchema),
            defaultValues,
        })

    const {
            execute: deleteClient
        } = useAction(deleteClientAction, {
            onSuccess({ data }) {
                console.log(data)
                toast(data?.message)
            },
            onError({ error }) {
                console.log(error)
                toast.error("Delete Failed, ensure client has no attatched jobs")
            }
        })

    function submitForm(data: insertClientSchemaType) {
            deleteClient(data)
            router.push(`/dashboard/clients`)
        }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitForm)}>
                <div>
                    <h2>{`${client?.firstName} ${client?.lastName}`}</h2>
                    <input type="text" className="p-1 border rounded-sm" placeholder={`type '${client?.firstName} ${client?.lastName}'`} value={inputValue} onChange={handleChange}/>
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