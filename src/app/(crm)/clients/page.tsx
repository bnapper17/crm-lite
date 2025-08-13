import { getClientList } from "@/lib/queries/getClientList"
import ClientCard from "@/components/ClientCard"
import SearchForm from "@/components/SearchForm"
import ClientForm from "@/components/ClientForm"
import { getClientSearchResults } from "@/lib/queries/getClientSearchResults"

export const dynamic = 'force-dynamic'

export default async function RequestsPage( { searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> } ) {

    const { searchText } = await searchParams
    
    const results = await getClientList()
   
    if(!searchText) return(
        <div className="flex justify-between xl:justify-around p-6 bg-dark-back">
            <div className="bg-dark-back min-h-lvh">
                <SearchForm searchType="/clients" placeholder="clients" className="mb-4 lg:mb-10 md:w-144" />

                {results.map((result) => (
                    
                    <ClientCard 
                    key={result.id} 
                    name={`${result.firstName} ${result.lastName}`} 
                    email={result?.email}
                    phone={result?.phone}
                    city={result.city}
                    address={`${result.address1} ${result.city} ${result.state} ${result.zip}`}
                    id = {result.id.toString()}
                    business={result.businessName}
                    />
                    
                ))}
            </div>
            <div className="hidden md:block p-4 bg-back shadow-lg rounded-md text-two h-fit w-sm lg:w-md xl:w-xl">
                <div>
                    <h2 className="text-two text-3xl text-center font-semibold pb-2 mb-4 border-b border-gray-700">Add New Client</h2>
                </div>
                <ClientForm />
                
            </div>
        </div>
    )

    const searchResults = await getClientSearchResults(searchText as string)

    return(
        <div className="flex justify-between xl:justify-around p-6 bg-dark-back">
            <div className="bg-dark-back min-h-lvh lg:flex flex-col items-center">
                <SearchForm searchType="clients" placeholder="clients" className="mb-4 lg:mb-10 md:w-144" />
                {searchResults.map((result) => (
                    
                    <ClientCard 
                    key={result.id} 
                    name={`${result.firstName} ${result.lastName}`} 
                    email={result?.email}
                    phone={result?.phone}
                    city={result.city}
                    id = {result.id.toString()}
                    business={result.businessName}
                    />
                    
                ))}
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