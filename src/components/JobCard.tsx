import Link from "next/link";
import { PhoneIcon, Mail, Map} from "lucide-react";
import { formatDistanceToNow } from "date-fns";


type Props = {
    id?: string,
    name: string,
    title: string,
    phone: string | null,
    email?: string | null,
    address?: string | null,
    city?: string | null,
    createdAt: Date
}

export default function JobCard({ name, title, phone, email, address, id, createdAt, city}: Props) {
    return(
        <div className="p-4 w-xs md:w-md xl:w-xl mb-6 bg-back shadow-lg rounded-md cursor-pointer">
            <div className="flex justify-between items-center ">
                <Link href={`/jobs/${id}`}>
                    <div className="flex flex-col gap-2 ">
                            <h2 className="text-2xl md:text-3xl text-two">{name}</h2>
                            <p>{title}</p>
                    </div>
                </Link>
                <div className="flex md:hidden gap-2">
                    {phone && <a href={`tel:${phone}`}><PhoneIcon/></a>}
                    {email && <a href={`mailto:${email}`}><Mail/></a>}
                    {address && <a href={`//maps.google.com/?q=${address}`}><Map /></a>}
                </div>
                <div className="hidden md:flex flex-col items-end gap-3 mb-4">
                    {phone && <div className="flex gap-2">
                        <p>{phone}</p>
                        <PhoneIcon size={20}/>
                    </div>}
                    {email && <div className="flex gap-2">
                        <p>{email}</p>
                        <a href={`mailto:${email}`}><Mail/></a>
                    </div>}
                    {address && <div className="flex gap-2">
                        <p>{city}</p>
                        <a href={`//maps.google.com/?q=${address}`}><Map /></a>
                    </div>}
                </div>
            </div>
            <div>
                <p className="text-md text-end text-one">{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
            </div>
        </div>
        )
}