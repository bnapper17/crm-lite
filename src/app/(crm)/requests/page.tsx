import { getNewClients } from "@/lib/queries/getNewClients"
import ClientCard from "@/components/ClientCard"
import ClientForm from "@/components/ClientForm"

export const dynamic = 'force-dynamic'

export default async function RequestsPage() {

    const newClients = await getNewClients()

    return(
        <div className="flex justify-between xl:justify-around bg-dark-back p-6 min-h-lvh">
            <div>
                <div>
                    {newClients.map((client) => (
                        <ClientCard
                        key={client.id}
                        id={client.id.toString()}
                        name={`${client.firstName} ${client.lastName}`}
                        email={client.email}
                        phone={client.phone}
                        city={client.city}
                        address={`${client.address1} ${client.city} ${client.state} ${client.zip}`}
                        />
                    ))}
                </div>
            </div>
            <div className="hidden md:block p-4 bg-back shadow-lg rounded-md text-two h-fit w-sm lg:w-md xl:w-xl">
                <div>
                    <h2 className="text-two text-3xl text-center font-semibold pb-2 mb-4 border-b border-gray-700">Add New Client</h2>
                </div>
                <ClientForm />
            </div>
        </div>
    )
}