import Link from "next/link";
import { PhoneIcon, Mail, Map} from "lucide-react";
import { formatDistanceToNow } from "date-fns";



type Props = {
    id: string,
    name: string,
    business?: string | null,
    phone: string | null,
    email?: string | null,
    city?: string | null,
    address?: string | null,
    updatedAt?: Date | null
}

export default function ClientCard({ name, business, phone, email, city, address, id, updatedAt}: Props) {
    
    return(
        <div className="p-4 w-xs md:w-md xl:w-xl mb-6 bg-back shadow-lg rounded-md">
            <div className="flex justify-between items-center">
                <div>
                    <Link href={`/clients/${id}`}>
                            <h2 className="text-2xl md:text-3xl text-two">{name}</h2>
                            {business && <h3 className="text-one text-xl mt-2">{business}</h3>}
                    </Link>
                </div>

                {/* mobile client info */}
                <div className="flex md:hidden gap-2">
                    {phone && <a href={`tel:${phone}`}><PhoneIcon/></a>}
                    {email && <a href={`mailto:${email}`}><Mail/></a>}
                    {address && <a href={`//maps.apple.com/?q=${address}`}><Map /></a>}
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
                        <a href={`//maps.apple.com/?q=${address}`}><Map /></a>
                    </div>}
                </div>
            </div>
            {updatedAt && <div>
                <p className="text-md text-end text-one">{`Requested ${formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}`}</p>
            </div>}
        </div>
        )
}