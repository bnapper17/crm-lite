
import { getClient } from "@/lib/queries/getClient"
import JobForm from "@/components/JobForm"
import Link from "next/link"

export default async function EditJobPage({ params }: {params: Promise<{clientId: string}>}) {
    
    const { clientId } = await params
    const client = await getClient(Number(clientId))

    return (
        <div className="flex flex-col items-center justify-between xl:justify-around bg-dark-back p-6">
            <div className="flex flex-col gap-4 p-4 bg-back shadow-lg rounded-md w-sm lg:w-xl">
                <Link href={`/dashboard/clients/${client.id}`} >
                    <h2 className="text-two text-3xl">{`${client.firstName} ${client.lastName}`}</h2>
                </Link>
                <p className="text-xl">{client.phone}</p>
                <p className="text-xl">{client.email}</p>
                <JobForm client={client}/>
            </div>
        </div>
    )
}
