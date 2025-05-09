"use client"

import Card from "@/components/Card"
import SearchForm from "@/components/SearchForm"
import ClientForm from "@/components/ClientForm"


type Props = {
    completedBids: object[],
    openJobs: object[],
    completedJobs: object[],
    clients: object[],
    newClients: object[],
    archivedClients: object[],
    archivedJobs: object[],
}

export default function Dashboard({ completedBids, openJobs, completedJobs, clients, newClients, archivedClients, archivedJobs }: Props) {

    const totalRequests = newClients.length

    return(
        <div  className="flex justify-between xl:justify-around bg-dark-back p-6">
            <div>
                <SearchForm searchType="/" placeholder="Jobs" className="mb-4 lg:mb-10 md:w-144"/>
                <Card title={"Add New Job:"} description={"Select to add new job"} url={"/new-job"} className="md:hidden" />
                <Card title={"New Requests:"} description={`${totalRequests.toString()} new requests`} url={"/requests"} />
                <Card title={"Completed Bids:"} description={`${completedBids.length.toString()} bids completed`} url={"/bids"} />
                <Card title={"Open Jobs:"} description={`${openJobs.length.toString()} open jobs`} url={"/jobs"} />
                <Card title={"Clients:"} description={`${clients.length.toString()} clients`} url={"/clients"} />
                <Card title={"Completed Jobs:"} description={`${completedJobs.length.toString()} jobs completed`} url={"/completed"} />
                <Card title={"Archive:"} description={`${archivedClients.length.toString()} clients archived`} description2={`${archivedJobs.length.toString()} jobs archived`} url={"/archive"} />
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