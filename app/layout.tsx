import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import {EdgeStoreProvider} from "@/lib/edgestore";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Podcast",
    description: "Generate your podcasts using AI",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <EdgeStoreProvider>
                    <ClerkProvider
                        appearance={{
                            layout: {
                                socialButtonsVariant: "iconButton",
                                logoImageUrl: "logo.png",
                            },
                            variables: {
                                colorPrimary: "#ffff",
                                colorBackground: "#15171c",
                                colorText: "white",
                                colorInputBackground: "#1b1f29",
                                colorInputText: "white",
                                colorTextOnPrimaryBackground: "white",
                            },
                        }}
                    >
                        {children}
                    </ClerkProvider>
                </EdgeStoreProvider>
            </body>
        </html>
    );
}
