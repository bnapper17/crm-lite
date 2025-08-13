import ClientCard from "@/components/ClientCard";
import ClientForm from "@/components/ClientForm"
import { getChipClientList } from "@/lib/queries/getChipClientList"
import { getWoodClientList } from "@/lib/queries/getWoodClientList";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"

export const dynamic = 'force-dynamic'

export default async function dropPage() {

    const chipResults = await getChipClientList()
    const woodResults = await getWoodClientList()

    return (
        <div className="flex justify-between xl:justify-around bg-dark-back p-6 min-h-lvh">
            <Tabs defaultValue= "chip">
                <TabsList className="bg-back mb-4">
                    <TabsTrigger value="chip" className="text-two text-xl cursor-pointer">Chip</TabsTrigger>
                    <TabsTrigger value="wood" className="text-two text-xl cursor-pointer">Wood</TabsTrigger>
                </TabsList>
                <TabsContent value="chip">
                    <div className="bg-dark-back">
                        <div className="bg-dark-back min-h-lvh">
                            {chipResults.map((result) => (
                                
                                <ClientCard 
                                key={result.id} 
                                name={`${result.firstName} ${result.lastName}`} 
                                email={result?.email}
                                phone={result?.phone}
                                city={result.city}
                                address={`${result.address1} ${result.city} ${result.state} ${result.zip}`}
                                id = {result.id.toString()}
                                business={result.businessName}
                                updatedAt={result.updatedAt}
                                />
                                
                            ))}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value= "wood">
                    <div className="bg-dark-back">
                        <div className="bg-dark-back min-h-lvh">
                            {woodResults.map((result) => (
                                
                                <ClientCard 
                                key={result.id} 
                                name={`${result.firstName} ${result.lastName}`} 
                                email={result?.email}
                                phone={result?.phone}
                                city={result.city}
                                address={`${result.address1} ${result.city} ${result.state} ${result.zip}`}
                                id = {result.id.toString()}
                                business={result.businessName}
                                updatedAt={result.updatedAt}
                                />
                                
                            ))}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
            <div className="hidden md:block p-4 bg-back shadow-lg rounded-md text-two h-fit w-sm lg:w-md xl:w-xl">
                <div>
                    <h2 className="text-two text-3xl text-center font-semibold pb-2 mb-4 border-b border-gray-700">Add New Client</h2>
                </div>
                <ClientForm />               
            </div>
        </div>
    )
}














// export default async function ChipPage() {
    
//     const results = await getChipClientList()
   
//     return(
//         <div className="flex justify-between xl:justify-around p-6 bg-dark-back">
//             <div className="bg-dark-back min-h-lvh">
//                 {results.map((result) => (
                    
//                     <ClientCard 
//                     key={result.id} 
//                     name={`${result.firstName} ${result.lastName}`} 
//                     email={result?.email}
//                     phone={result?.phone}
//                     city={result.city}
//                     address={`${result.address1} ${result.city} ${result.state} ${result.zip}`}
//                     id = {result.id.toString()}
//                     business={result.businessName}
//                     updatedAt={result.updatedAt}
//                     />
                    
//                 ))}
//             </div>
//             <div className="hidden md:block p-4 bg-back shadow-lg rounded-md text-two h-fit w-sm lg:w-md xl:w-xl">
//                 <div>
//                     <h2 className="text-two text-3xl text-center font-semibold pb-2 mb-4 border-b border-gray-700">Add New Client</h2>
//                 </div>
//                 <ClientForm />
                
//             </div>
//         </div>
//     )
// }