import { getNewClients } from "@/lib/queries/getNewClients"
import ClientCard from "@/components/ClientCard"
import ClientForm from "@/components/ClientForm"
import SearchForm from "@/components/SearchForm"
import { getRequestSearchResults } from "@/lib/queries/getRequestSearchResults"

export const dynamic = 'force-dynamic'

export default async function RequestsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

    const { searchText } = await searchParams

    const newClients = await getNewClients()

    if(!searchText) return(

        <div className="flex justify-between xl:justify-around bg-dark-back p-6 min-h-lvh">
            <div>
                <SearchForm searchType="/requests" placeholder="requests" className="mb-4 lg:mb-10" />
                <div>
                    <div>
                        {newClients.map((client) => (
                            <ClientCard
                            key={client.id}
                            id={client.id.toString()}
                            name={`${client.firstName} ${client.lastName}`}
                            email={client.email}
                            phone={client.phone}
                            city={`${client.address1}, ${client.city}`}
                            address={`${client.address1} ${client.city} ${client.state} ${client.zip}`}
                            updatedAt={client.updatedAt}
                            business={client.businessName}
                            />
                        ))}
                    </div>
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

    const searchResults = await getRequestSearchResults(searchText as string)

    return(
        <div className="flex justify-between xl:justify-around p-6 bg-dark-back">
                    <div className="bg-dark-back min-h-lvh">
                        <SearchForm searchType="/requests" placeholder="requests" className="mb-4 lg:mb-10" />
                        {searchResults.map((result) => (
                            <ClientCard
                            key={result.id}
                            id={result.id.toString()}
                            name={`${result.firstName} ${result.lastName}`}
                            email={result.email}
                            phone={result.phone}
                            city={`${result.address1}, ${result.city}`}
                            address={`${result.address1} ${result.city} ${result.state} ${result.zip}`}
                            updatedAt={result.updatedDate}
                            business={result.businessName}
                            />
                        ))}
                    </div>
                    <div className="hidden md:block p-4 bg-back shadow-lg rounded-md text-two h-fit w-sm lg:w-md xl:w-xl">
                        <ClientForm />
                    </div>
                </div>
    )
}