import ClientCard from "@/components/ClientCard";
import JobCard from "@/components/JobCard";
import { getArchivedClients } from "@/lib/queries/getArchivedClients";
import { getArchivedJobs } from "@/lib/queries/getArchivedJobs";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"

export const dynamic = 'force-dynamic'

export default async function Archivepage() {
    const archivedClients = await getArchivedClients()
    const archivedJobs = await getArchivedJobs()

    return (
        <div className="flex justify-center bg-dark-back p-4 min-h-lvh">
            <Tabs defaultValue= "clients" className="w-full">
                <TabsList className="bg-back mb-4">
                    <TabsTrigger value="clients" className="text-two text-xl cursor-pointer">Clients</TabsTrigger>
                    <TabsTrigger value="jobs" className="text-two text-xl cursor-pointer">Jobs</TabsTrigger>
                </TabsList>
                <TabsContent value="clients">
                    <div>
                        {archivedClients.map((client) => (
                            <ClientCard 
                            key={client.id}
                            id={client.id.toString()}
                            name={`${client.firstName} ${client.lastName}`}
                            phone={client.phone}
                            email={client.email}
                            city={client.city}
                            address={client.address1}
                            business={client.businessName}
                            />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value= "jobs">
                    <div>
                        {archivedJobs.map((job) => (
                            <JobCard
                            key={job.id}
                            id={job.id.toString()}
                            title={job.title}
                            name={`${job.firstName} ${job.lastName}`}
                            phone={job.phone}
                            email={job.email}
                            city={job.city}
                            address={job.address1}
                            date={job.updatedDate}
                            dateText= "archived"
                            business={job.businessName}
                            />
                            
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}