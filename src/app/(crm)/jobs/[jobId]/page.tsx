import JobForm from "@/components/JobForm"
import DeleteJobForm from "@/components/DeleteJobForm"
import { getJob } from "@/lib/queries/getJob"
import { getClient } from "@/lib/queries/getClient"
import Link from "next/link"
import { PhoneIcon, Mail, Map} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { EllipsisVertical } from "lucide-react"


export default async function JobPage({ params }: {params: Promise<{jobId: string}>}) {

    const { jobId } = await params
    
    const job = await getJob(Number(jobId))
    const client = await getClient(job.clientId)

    return (
        <div className="min-h-lvh flex flex-col items-center bg-dark-back pt-6">
            <div className="flex flex-col gap-4 p-4 bg-back shadow-lg rounded-md w-sm lg:w-xl">
                <div className="flex justify-between">
                    <Link href={`/clients/${client.id}`} >
                        <h2 className="text-two text-3xl">{`${client.firstName} ${client.lastName}`}</h2>
                    </Link>
                    <Dialog>
                        <DialogTrigger asChild>
                            <EllipsisVertical className="text-two cursor-pointer"/>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Job?</DialogTitle>
                                <DialogDescription>
                                    Type job name then click Delete button to permanently delete job, or exit and switch the archive toggle to archive job instead.
                                </DialogDescription>
                            </DialogHeader>
                            <DeleteJobForm client={client} job={job}/>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="flex">
                    <p className="text-xl mr-4">{client.phone}</p>
                    {client.phone && <a href={`tel:${client.phone}`}><PhoneIcon/></a>}
                </div>
                <div className="flex items-end">
                    <div className="mr-4">
                        <p className="text-xl">{client.address1}</p>
                        <p className="text-xl">{`${client.city} ${client.state} ${client.zip}`}</p>
                    </div>
                    {client.city && <Link href={`//maps.apple.com/?q=${client.address1}, ${client.city}, ${client.state}, ${client.zip}`}>
                        <Map/>
                    </Link>}
                </div>
                <div className="flex">
                    <p className="text-xl mr-4">{client.email}</p>
                    {client.email && <a href={`mailto:${client.email}`}><Mail/></a>}
                </div>
                <JobForm job={job} client={client}/>
            </div>
        </div>
    )
}
