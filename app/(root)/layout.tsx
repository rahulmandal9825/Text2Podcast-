
import LeftSidebar from "@/components/LeftSidebar";
import MobNav from "@/components/MobNav";
import Image from "next/image";
import RigthSidebar from "@/components/RigthSidebar";
import { Toaster } from "@/components/ui/toaster";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className="relative flex flex-col">
          <main className="relative flex">
          <LeftSidebar/>
          <section className="flex min-h-screen flex-1 flex-col px-4 sm:px-14">
            <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
              <div className="flex h-16 items-center justify-between md:hidden ">
                <MobNav/>
              </div>
              <div className="flex flex-col md:pb-14">
                <Toaster/>
                {children}
              </div>
            </div>
          </section>
            <RigthSidebar/>
          </main>

           
        </div>

  );
}
