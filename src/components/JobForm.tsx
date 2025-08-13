"use client"

import { InputWithLabel } from "@/components/inputs/inputWithLabel"
import { TextAreaWithLabel } from "@/components/inputs/TextareaWithLabel"
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel"
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
import Link from "next/link"


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
                <div>
                    <InputWithLabel
                        fieldTitle="Job"
                        nameInSchema="title"
                    />
                    <TextAreaWithLabel
                        fieldTitle="Notes"
                        nameInSchema="notes"
                    />
                    <div className="flex justify-between">
                        <InputWithLabel
                            fieldTitle="Bid Amount"
                            nameInSchema="bidAmount"
                            className="w-1/2"
                        />
                        <div className="flex flex-col gap-6">
                            <CheckboxWithLabel
                                fieldTitle="Accepted"
                                nameInSchema="bidAccepted"
                                message="Accepted"
                                disabled={!job?.bidCompleted}
                                />
                            <CheckboxWithLabel
                                fieldTitle="Completed"
                                nameInSchema="completed"
                                message="Completed"
                                disabled={!job?.bidAccepted}
                                />
                        </div>
                    </div>
                </div>
                <div>
                {job ?
                <div className="flex justify-around">
                    <Button 
                        type="submit" 
                        variant="ghost"
                        className="w-1/3 text-two border border-one shadow-lg hover:bg-one hover:text-white active:shadow-none active:text-xs mt-4 cursor-pointer"
                    >Update
                    </Button>
                    <Link href={`/dashboard/jobs/${job.id}/estimate`} className="w-1/3">
                        <Button 
                            variant="ghost"
                            className="w-full text-two border border-one shadow-lg hover:bg-one hover:text-white active:shadow-none active:text-xs mt-4 cursor-pointer"
                            >Estimate
                        </Button> 
                    </Link> 
                </div> :
                <Button 
                    type="submit" 
                    variant="ghost"
                    className="w-full text-two border border-one shadow-lg hover:bg-one hover:text-white active:shadow-none active:text-xs mt-4 cursor-pointer"
                >Submit
                </Button> 
                }    
                </div>
            </form>
        </Form>
    )

}