"use client"

import { insertClientSchema, type insertClientSchemaType, type selectClientSchemaType } from "@/zod-schemas/client"
import { Form } from "@/components/ui/form";
import { InputWithLabel } from "@/components/inputs/inputWithLabel"
import { TextAreaWithLabel } from "@/components/inputs/TextareaWithLabel"
import { PhoneInputWithLabel } from "@/components/inputs/PhoneInputWithLabel";
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { SwitchWithLabel } from "@/components/inputs/SwitchWithLabel"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useAction } from "next-safe-action/hooks"
import { saveClientAction } from "@/app/actions/saveClientAction"


type Props = {
    client?: selectClientSchemaType
    newClient?: boolean
    jobs?: object[]
    className?: string
}

export default function ClientForm({ client, newClient = true, jobs, className }: Props) {

    const defaultValues: insertClientSchemaType = {
        id: client?.id ?? 0,
        firstName: client?.firstName ?? "",
        lastName: client?.lastName ?? "",
        businessName: client?.businessName ?? "",
        email: client?.email ?? "",
        phone: client?.phone ?? "",
        address1: client?.address1 ?? "",
        city: client?.city ?? "",
        state: client?.state ?? "",
        zip: client?.zip ?? "",
        notes: client?.notes ?? "",
        archived: client?.archived ?? false,
        chipClient: client?.chipClient ?? false,
        woodClient: client?.woodClient ?? false
    }

    const form = useForm<insertClientSchemaType>({
            mode: "onBlur",
            resolver: zodResolver(insertClientSchema),
            defaultValues,
        })

    const {
        execute: saveClient
    } = useAction(saveClientAction, {
        onSuccess({ data }) {
            console.log(data)
            toast(data?.message)
            if(newClient) form.reset(defaultValues)
        },
        onError({ error }) {
            console.log(error)
            toast.error("Save Failed")
        }
    })
    
    function submitForm(data: insertClientSchemaType) {
        saveClient(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitForm)}>
            <div className={className}>
                <div className="flex gap-4">
                    <InputWithLabel
                        fieldTitle="First Name"
                        nameInSchema="firstName"
                        />
                    <InputWithLabel
                        fieldTitle="Last Name"
                        nameInSchema="lastName"
                        />
                </div>
                <InputWithLabel
                    fieldTitle="Business Name"
                    nameInSchema="businessName"
                    />
                <InputWithLabel
                    fieldTitle="Street Address"
                    nameInSchema="address1"
                    />
                <div className = "flex gap-4">
                    <InputWithLabel
                        fieldTitle="City"
                        nameInSchema="city"
                        />
                    <InputWithLabel
                        fieldTitle="State"
                        nameInSchema="state"
                        />
                    <InputWithLabel
                        fieldTitle="Zip"
                        nameInSchema="zip"
                        />
                </div>
                <div className = "flex gap-4">
                    <PhoneInputWithLabel
                        fieldTitle="Phone"
                        nameInSchema="phone"
                        />
                    <InputWithLabel
                        fieldTitle="email"
                        nameInSchema="email"
                        />
                </div>
                <TextAreaWithLabel
                    fieldTitle="Notes"
                    nameInSchema="notes"
                    />
                <div className="flex justify-around">
                    <CheckboxWithLabel
                    fieldTitle="Wood Client"
                    nameInSchema="woodClient"
                    message="Wood Drop"
                    />

                    <CheckboxWithLabel
                    fieldTitle="Chip Client"
                    nameInSchema="chipClient"
                    message="Chip Drop"
                    />
                </div>
            </div>
                <div>
                    <Button 
                        type="submit" 
                        variant="ghost"
                        className="w-full text-two border border-one shadow-lg hover:bg-one hover:text-white active:shadow-none active:text-xs mt-4 cursor-pointer"
                    >Submit
                    </Button>
                </div>
                <div className={newClient ? "hidden" : ""}>
                    <SwitchWithLabel
                        fieldTitle="Archive Client"
                        nameInSchema="archived"
                        className="flex text-two mt-4 justify-end"
                        isActive={jobs && jobs.length > 0 ? true : false}
                    />
                </div>
            </form>
        </Form>
    )
}