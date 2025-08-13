import Dashboard from "@/components/Dashboard"
import JobCard from "@/components/JobCard"
import SearchForm from "@/components/SearchForm"
import ClientForm from "@/components/ClientForm"

import { getJobSearchResults } from "@/lib/queries/getJobSearchResults"
import { getClientList } from "@/lib/queries/getClientList"
import { getCompletedBids } from "@/lib/queries/getCompletedBids"
import { getOpenJobs } from "@/lib/queries/getOpenJobs"
import { getCompletedJobs } from "@/lib/queries/getCompletedJobs"
import { getNewClients } from "@/lib/queries/getNewClients"
import { getArchivedClients } from "@/lib/queries/getArchivedClients"
import { getArchivedJobs } from "@/lib/queries/getArchivedJobs"
import { getChipClientList } from "@/lib/queries/getChipClientList"
import { getWoodClientList } from "@/lib/queries/getWoodClientList"

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

    const { searchText } = await searchParams

    const completedBids = await getCompletedBids()
    const openJobs = await getOpenJobs()
    const completedJobs = await getCompletedJobs()
    const clients = await getClientList()
    const newClients = await getNewClients()
    const archivedClients = await getArchivedClients()
    const archivedJobs = await getArchivedJobs()
    const chipClients = await getChipClientList()
    const woodClients = await getWoodClientList()
    
    if(!searchText) return(
        <div className="min-h-lvh bg-dark-back">            
            <Dashboard newClients={newClients} completedBids={completedBids} openJobs={openJobs} completedJobs={completedJobs} clients={clients} archivedClients={archivedClients} archivedJobs={archivedJobs} chipClients={chipClients} woodClients={woodClients}/>
        </div>
    )

    const searchResults = await getJobSearchResults(searchText as string)

    return(
        <div className="flex justify-between xl:justify-around p-6 bg-dark-back">
            <div className="bg-dark-back min-h-lvh">
                <SearchForm searchType="/" placeholder="jobs" className="mb-4 lg:mb-10" />
                {searchResults.map((result) => (
                    <JobCard 
                    key={result.id} 
                    name={`${result.firstName} ${result.lastName}`} 
                    title={result.title}
                    email={result.email}
                    phone={result.phone}
                    address={`${result.address1}, ${result.city}, ${result.state} ${result.zip}`}
                    city={result.city}
                    id = {result.id.toString()}
                    date={result.updatedDate}
                    dateText= "updated"
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