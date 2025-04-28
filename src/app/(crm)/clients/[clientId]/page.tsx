
import ClientForm from "@/components/ClientForm"
import { getClient } from "@/lib/queries/getClient"
import { getClientJobs } from "@/lib/queries/getClientJobs"
import Link from "next/link"
import AddJobButton from "@/components/AddJobButton"



export default async function ClientPage({ params }: { params: Promise<{ clientId: string}> }) {
    const { clientId } = await params
    const client = await getClient(Number(clientId))
    const clientJobs = await getClientJobs(client.id)
    

    return (
        <div className="flex flex-col items-center justify-between xl:justify-around bg-dark-back p-6">
            <div className="p-4 bg-back shadow-lg rounded-md w-sm lg:w-xl">
                <ClientForm client={client} newClient={false}/>
                <div className="mt-4">
                    {clientJobs.map((job) => (
                        <Link href={`/jobs/${job.id}`} key={job.id}>
                            <div className="p-4 border-t border-gray-700">
                                <h2>{job.title}</h2>
                                <div className="flex justify-between">
                                    <p>{job.bidAmount}</p>
                                    {job.bidAccepted ? (<p>Bid Accepted</p>) : (<p>Bid Not Accepted</p>)}
                                    {job.completed ? (<p>Completed</p>) : (<p>Open</p>)}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex justify-end border-t border-gray-700 mt-4 pt-4">
                    <AddJobButton id={clientId} />
                </div>
            </div>
        </div>
    )
}

