"use client";

import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import React from "react";
import {SidebarLink} from "../constants";
import { cn } from "@/lib/utils";


const LeftSidebar = () => {
    const pathname = usePathname();
    return (
        <section className="Left_sidebar ">
            <nav>
                <Link href="/" className="flex  gap-3 cursor-pointer items-center pb-10 max-lg:justify-center">
                    <Image src="/logo.png" width={30} height={30} alt="logo" />
                    <h1 className="text-2xl text-white font-semibold max-lg:hidden">Text2Podcast</h1>
                </Link>
                {SidebarLink.map(({route, label, imagUrl}) => {
                    const isActive = pathname === route || pathname.startsWith(`${route}/`);

                    return (
                        <Link
                            href={route}
                            key={label}
                            className={cn(
                                "flex gap-3 py-4 cursor-pointer items-center justify-center lg:justify-start",
                                {
                                    "bg-nav-focus border-r-4 border-orange-1": isActive,
                                }
                            )}
                        >
                            <Image src={imagUrl} width={25} height={25} alt="navimag" />
                            <h1>{label}</h1>
                        </Link>
                    );
                })}
            </nav>

            <SignedOut>
                <div className=" my-10 bg-orange-1  p-3 rounded-l-xl flex gap-3 font-bold ">
                    <Image
                    src="/profile.svg"
                    width={25}
                    height={25}
                    alt="sign btn"
                    />

                    <SignInButton />
                </div>
            </SignedOut>

            <SignedIn>
                <div  className=" my-10 bg-orange-1 p-3 rounded-l-xl flex gap-3 font-bold ">
                    <UserButton  />
                    <h1>Profile</h1>
                </div>
            </SignedIn>
        </section>
    );
};

export default LeftSidebar;
