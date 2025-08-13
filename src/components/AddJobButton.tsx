"use client"
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

type Props = {
    id: string
    className?: string
}

export default function AddJobButton({ id, className }: Props) {

    function addJob() {
        redirect(`/new-job/${id}`)
    }

    return (
        <Button variant="ghost" className={`shadow-lg border border-one cursor-pointer w-36 hover:bg-one hover:text-white active:shadow-back ${className}`} onClick={addJob}>Add Job</Button>
    )

}