import { getJob } from "@/lib/queries/getJob"
import { getClient } from "@/lib/queries/getClient"
import company_logo from "@/../public/images/logo.png"
import Image from "next/image";
import SignatureComponent from "@/components/SignatureComponent";



export default async function JobPage({ params }: {params: Promise<{jobId: string}>}) {

    const { jobId } = await params
    
    const job = await getJob(Number(jobId))
    const client = await getClient(job.clientId)
    const currencyFormatter = new Intl.NumberFormat('default', {
      style: 'currency',
      currency: 'USD'
    })

    return (
        <div className="min-h-lvh flex flex-col items-center bg-dark-back">
          <div className="bg-back w-full max-w-6xl min-h-lvh">
            {/* header section */}
            {/* <div className="flex items-center lg:justify-between border-b-2 border-b-one">
              <div className="w-24 lg:w-48">
                <Image
                    src={company_logo}
                    alt="B.C. Trees Logo"
                    /> 
              </div>
              <div className="lg:px-30">
                <h2 className="text-2xl lg:text-4xl ">B.C. Trees llc.</h2>
                <div className="text-lg">
                  <p>1113 IN-64, English, IN 47118</p>
                  <p>812-572-1047</p>
                  <p>briancoxtrees@gmail.com</p>
                </div>
              </div>
            </div> */}

            {/* client info section */}
            <div className="text-xl lg:text-3xl my-6 lg:mx-8 border-b-2 border-b-two pb-4">
              <div className="px-6 flex flex-col lg:gap-2">
                <h3 className="text-two text-3xl lg:text-4xl font-bold">Bill To:</h3>
                <p className="font-semibold">{`${client.firstName} ${client.lastName}`}</p>
                <p>{client.address1}</p>
                <div className="flex gap-2">
                  <p>{client.city},</p>
                  <p>{client.state}</p>
                  <p>{client.zip}</p>
                </div>
                <p>{client.phone}</p>
              </div>
            </div>

            {/* job info section */}
            <div className="text-xl lg:text-3xl lg:mx-8 border-b-2 border-b-one px-6">
              <div className="lg:flex justify-between pb-4">
                <div className="flex flex-col lg:gap-2">
                  <div className="flex gap-4">
                    <p className="text-two font-semibold">Job:</p>
                    <p>{job.title}</p>
                  </div>
                  <div className="flex gap-4">
                    <p className="text-two font-semibold">Estimate:</p>
                    <p>{job.bidAmount ? currencyFormatter.format(parseFloat(job.bidAmount)) : "Estimate not entered"}</p>
                  </div>
                  <div className="flex gap-4">
                    <p className="text-two font-semibold">Estimate Date:</p>
                    <p>{job.bidDate ? job.bidDate.toLocaleString('en-US', {year: 'numeric', month:'long', day:'numeric'}).toString() 
                    : new Date().toLocaleString('en-US', {year: 'numeric', month:'long', day:'numeric'}).toString()}</p>
                  </div>
                </div>
                <div className="flex gap-4 lg:w-1/2">
                  <p className="text-two font-semibold">Description:</p>
                  <p>{job.notes}</p>
                </div>
              </div>
            </div>
            
            {/* signature */}
            <SignatureComponent
              clientId={job.clientId}
              title={job.title}
              id={job.id}
              notes={job.notes}
              archived={job.archived}
              createdAt={job.createdAt}
              updatedAt={job.updatedAt}
              bidCompleted={job.bidCompleted}
              bidAmount={job.bidAmount}
              bidAccepted={job.bidAccepted}
              signature={job.signature}
            />
          </div>
        </div>
    )
}
