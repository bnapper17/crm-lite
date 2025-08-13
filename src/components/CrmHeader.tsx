import Link from "next/link"
import CrmAnimatedHamburger from "@/components/CrmAnimatedHamburger"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function CrmHeader() {
    return(
        <div className="p-2 h-20 md:h-28 flex justify-between border-b-2 border-one bg-back">
            <div className="flex items-end">
                <Link href="/">
                    <h2 className="text-4xl md:text-6xl text-two ">Dashboard</h2>
                </Link>
            </div>

            {/* navigation links on large screens */}
            <div className="hidden lg:flex justify-evenly gap-5 items-end text-xl md:text-2xl text-two font-semibold md:mr-8">
                <Link href="/requests" title="Requests">
                    <h2 className=" hover:underline">Requests</h2>
                </Link>
                <Link href="/bids" title="Bids">
                    <h2 className=" hover:underline">Bids</h2>
                </Link>
                <Link href="/jobs" title="Jobs">
                    <h2 className=" hover:underline">Jobs</h2>
                </Link>
                <Link href="/completed" title="Completed">
                    <h2 className=" hover:underline">Completed</h2>
                </Link>
                <Link href="/clients" title="Clients">
                    <h2 className=" hover:underline">Clients</h2>
                </Link>
                <Link href="/drop" title="Drop">
                    <h2 className=" hover:underline">Drop</h2>
                </Link>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Logout"
                    title="Logout"
                    className="rounded-full"
                    asChild
                >
                    <LogoutLink className="text-two">
                        <LogOut />
                    </LogoutLink>
                </Button>
            </div>

            {/* navigation links on small screens */}
            <CrmAnimatedHamburger />
        </div>
    )
}