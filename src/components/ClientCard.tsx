import Link from "next/link";
import { PhoneIcon, Mail, Map} from "lucide-react";



type Props = {
    id: string,
    name: string,
    phone: string,
    email?: string | null,
    city?: string | null,
    address?: string | null,
}

export default function ClientCard({ name, phone, email, city, address, id}: Props) {
    
    return(
        <div className="flex justify-between items-center p-4 w-xs md:w-md xl:w-xl mb-6 bg-back shadow-lg rounded-md">
            <div className="flex flex-col gap-2 ">
                <Link href={`/clients/${id}`}>
                        <h2 className="text-2xl md:text-3xl text-two">{name}</h2>
                </Link>
            </div>

            {/* mobile client info */}
            <div className="flex md:hidden gap-2">
                {phone && <a href={`tel:${phone}`}><PhoneIcon/></a>}
                {email && <a href={`mailto:${email}`}><Mail/></a>}
                {address && <a href={`//maps.google.com/?q=${address}`}><Map /></a>}
            </div>

            {/* larger screen client info */}
            <div className="hidden md:flex flex-col items-end gap-3">
                {phone && <div className="flex gap-2">
                    <p>{phone}</p>
                    <a href={`tel:${phone}`} className="xl:pointer-events-none"><PhoneIcon size={20}/></a>
                </div>}
                {email && <div className="flex gap-2">
                    <p>{email}</p>
                    <a href={`mailto:${email}`}><Mail/></a>
                </div>}
                {city && <div className="flex gap-2">
                    <p>{city}</p>
                    <a href={`//maps.google.com/?q=${address}`}><Map /></a>
                </div>}
            </div>
        </div>
        )
}