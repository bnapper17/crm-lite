import { getCompletedJobs } from "@/lib/queries/getCompletedJobs"
import JobCard from "@/components/JobCard"

export const dynamic = 'force-dynamic'

export default async function RequestsPage() {
    const results = await getCompletedJobs()
    return(
        <div className="bg-dark-back p-6 min-h-lvh">
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
                    date = {result.completedDate == null ? result.updatedDate : result.completedDate}
                    dateText = {result.completedDate === null ? "Updated" : "Completed"}
                    business={result.businessName}
                    />
            ))}
        </div>
    )
}