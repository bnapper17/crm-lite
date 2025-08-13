
import ClientForm from "@/components/ClientForm"
import { getClient } from "@/lib/queries/getClient"
import { getClientJobs } from "@/lib/queries/getClientJobs"

import { formatDistanceToNow } from "date-fns";
import Link from "next/link"
import AddJobButton from "@/components/AddJobButton"
import DeleteClientForm from "@/components/DeleteClientForm"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"



export default async function ClientPage({ params }: { params: Promise<{ clientId: string}> }) {
    const { clientId } = await params
    const client = await getClient(Number(clientId))
    const clientJobs = await getClientJobs(client.id)

    const openClientJobs = clientJobs.filter((job) => !job.completed && !job.archived)
    const completedClientJobs = clientJobs.filter((job) => job.completed)
    const archivedClientJobs = clientJobs.filter((job) => job.archived)

    return (
        <div className="flex flex-col items-center justify-between xl:justify-around bg-dark-back p-6">
            <div className="relative p-4 bg-back shadow-lg rounded-md w-sm lg:w-xl">
                <Dialog>
                    <DialogTrigger asChild className="absolute right-2">
                        <Trash2 className="text-two cursor-pointer"/>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Client?</DialogTitle>
                            <DialogDescription>
                                Type clients name then click Delete button to permanently delete, or exit and switch the archive toggle to archive instead.
                            </DialogDescription>
                        </DialogHeader>
                        <DeleteClientForm client={client}/>
                    </DialogContent>
                </Dialog>
                <ClientForm client={client} jobs={openClientJobs} newClient={false} className="mt-6"/>
                <div className="mt-4">
                    {openClientJobs.map((job) => (
                        <Link href={`/dashboard/jobs/${job.id}`} key={job.id}>
                            <div className="p-4 border-t border-gray-700">
                                <h2 className="border-b border-gray-700 w-fit mb-4 text-xl">{job.title}</h2>
                                <div className="flex justify-between">
                                    <p>{job.bidAmount ? job.bidAmount : "No Bid"}</p>
                                    {job.bidAccepted ? (<p>Bid Accepted</p>) : (<p>Bid Not Accepted</p>)}
                                    <p className="text-md text-end text-one">{`updated ${formatDistanceToNow(new Date(job.updatedAt), { addSuffix: true })}`}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex justify-between items-end border-t border-gray-700 mt-4 pt-4">
                    <div className="flex flex-col gap-4">
                        {completedClientJobs.length > 0 && (
                            <h2 className="text-one">{completedClientJobs.length} jobs completed</h2>
                        )}
                        {archivedClientJobs.length > 0 && (
                            <h2 className="text-two">{archivedClientJobs.length} jobs archived</h2>
                        )}
                    </div>
                    <AddJobButton id={clientId} />
                </div>
            </div>
        </div>
    )
}

