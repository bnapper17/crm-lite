"use client"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
    DrawerHeader,
    DrawerDescription
  } from "@/components/ui/drawer"

  import Link from "next/link"
  import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
  import { Button } from "@/components/ui/button"
  import { LogOut } from "lucide-react"

  

export default function AnimatedHamburger() {

    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <div
                    className="flex lg:hidden flex-col justify-center items-center mr-4"
                    >
                    <span
                        className={`bg-two block transition-all duration-300 ease-out h-1 w-8 rounded-sm`}
                        ></span>
                    <span
                        className={`bg-two block transition-all duration-300 ease-out h-1 w-8 rounded-sm my-1.5`}
                        ></span>
                    <span
                        className={`bg-two block transition-all duration-300 ease-out h-1 w-8 rounded-sm`}
                        ></span>
                </div>
            </DrawerTrigger>
            <DrawerContent className="bg-back/70">
                <DrawerHeader className="hidden">
                    <DrawerTitle>
                        Menu
                    </DrawerTitle>
                    <DrawerDescription>
                        Navigation Links for Home, Services, Contact, and About
                    </DrawerDescription>
                </DrawerHeader>
                    <div className="flex flex-col justify-evenly gap-10 mt-20 ml-10 text-3xl text-two font-semibold md:mr-8">
                        <DrawerClose asChild>
                            <Link href="/" title="Dashboard">
                                <h2 className=" hover:underline">Dashboard</h2>
                            </Link>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <Link href="/new-job" title="Add Job">
                                <h2 className=" hover:underline">Add Job</h2>
                            </Link>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <Link href="/requests" title="Requests">
                                <h2 className=" hover:underline">Requests</h2>
                            </Link>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <Link href="/bids" title="Bids">
                                <h2 className=" hover:underline">Bids</h2>
                            </Link>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <Link href="/jobs" title="Jobs">
                                <h2 className=" hover:underline">Jobs</h2>
                            </Link>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <Link href="/clients" title="Clients">
                                <h2 className=" hover:underline">Clients</h2>
                            </Link>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <Link href="/completed" title="Completed">
                                <h2 className=" hover:underline">Completed Jobs</h2>
                            </Link>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <Link href="/drop" title="Drop">
                                <h2 className=" hover:underline">Drop</h2>
                            </Link>
                        </DrawerClose>
                        <DrawerClose asChild>
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
                        </DrawerClose>
                    </div>
            </DrawerContent>
        </Drawer>
    )
}