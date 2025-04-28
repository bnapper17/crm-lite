import ClientForm from "@/components/ClientForm"


export default function NewJobPage() {
    return(
        <div  className="bg-dark-back min-h-lvh p-6">
            <div className="p-4 bg-back shadow-lg rounded-md text-two h-fit">
                <ClientForm />
            </div>
        </div>
    )
}