import { getOpenJobs } from "@/lib/queries/getOpenJobs"
import JobCard from "@/components/JobCard"
import ClientForm from "@/components/ClientForm"

export const dynamic = 'force-dynamic'

export default async function RequestsPage() {
    const results = await getOpenJobs()
    return(
        <div className="flex justify-between xl:justify-around bg-dark-back p-6 min-h-lvh">
            <div>
                {results.map((result) => (
                    <JobCard 
                    key={result.id} 
                    name={`${result.firstName} ${result.lastName}`} 
                    title={result.title}
                    email={result?.email}
                    phone={result?.phone}
                    city={result?.city}
                    address={`${result.address1}, ${result.city}, ${result.state} ${result.zip}`}
                    id = {result.id.toString()}
                    date={result.acceptedDate === null ? result.updatedDate : result.acceptedDate}
                    dateText= {result.acceptedDate === null ? "Updated" : "Bid Accepted"}
                    business={result.businessName}
                    bid={result.bid}
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