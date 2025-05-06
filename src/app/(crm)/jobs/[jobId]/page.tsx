import JobForm from "@/components/JobForm"
import { getJob } from "@/lib/queries/getJob"
import { getClient } from "@/lib/queries/getClient"
import Link from "next/link"


export default async function JobPage({ params }: {params: Promise<{jobId: string}>}) {

    const { jobId } = await params
    
    const job = await getJob(Number(jobId))
    const client = await getClient(job.clientId)

    return (
        <div className="flex flex-col items-center justify-between xl:justify-around bg-dark-back p-6">
            <div className="flex flex-col gap-4 p-4 bg-back shadow-lg rounded-md w-sm lg:w-xl">
                <Link href={`/dashboard/clients/${client.id}`} >
                    <h2 className="text-two text-3xl">{`${client.firstName} ${client.lastName}`}</h2>
                </Link>
                <p className="text-xl">{client.phone}</p>
                <p className="text-xl">{client.email}</p>
                <JobForm job={job} client={client}/>
            </div>
        </div>
    )
}
