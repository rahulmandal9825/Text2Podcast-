"use client";

import React from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import {SidebarLink} from "@/constants";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

const MobNav = () => {
    const pathname = usePathname();
    return (
        <section>
            <Sheet>
                <SheetTrigger>
                    <Image src="/hamburger.svg" width={30} height={30} alt="hambuger" className="cursor-pointer" />
                </SheetTrigger>
                <SheetContent side="left" className=" border-none bg-black-1">
                    <Link href="/" className="flex cursor-pointer items-center gap-1 pb-10 pl-4 ">
                        <Image src="/logo.png" width={35} height={35} alt="logo" />
                        <h1 className="text-2xl font-extrabold text-white-1 ml-2"> Text2PodCast</h1>
                    </Link>
                    <div className="flex flex-col justify-between overflow-y-auto">
                        <SheetClose asChild>
                            <nav className="flex h-full flex-col gap-6  w-full text-white-1">
                                {SidebarLink.map(({route, label, imagUrl}) => {
                                    const isActive = pathname === route || pathname.startsWith(`${route}/`);

                                    return (
                                        <SheetClose asChild key={route}>
                                            <Link
                                                href={route}
                                                key={label}
                                                className={cn(
                                                    "flex gap-3 py-4 cursor-pointer w-full pl-10 lg:justify-start",
                                                    {
                                                        "bg-nav-focus border-r-4 border-orange-1": isActive,
                                                    }
                                                )}
                                            >
                                                <Image src={imagUrl} width={25} height={25} alt="navimag" />
                                                <h1>{label}</h1>
                                            </Link>
                                        </SheetClose>
                                    );
                                })}
                            </nav>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    );
};

export default MobNav;
