import PodcastDetailPlayer from "@/components/PodcastDetailPlayer";
import {getonePodcast} from "@/lib/actions/podcast.action";
import {currentUser} from "@clerk/nextjs/server";
import Image from "next/image";
import {usePathname} from "next/navigation";
import React from "react";

const Podcast = async ({params: {podcastId}}: {params: {podcastId: string}}) => {
    const podcast = await getonePodcast(podcastId);
    const user = await currentUser();
    console.log(podcast?.authorId);
    const isOwner = user?.id === podcast?.authorId;


    return (
        <section className="w-full flex flex-col">
            <header className="mt-9 flex items-center justify-between">
                <h1 className="text-2xl fond bold text-white-1">Currenty Playing</h1>
                <figure className=" flex gap-3">
                    <Image src="/headphone.svg" width={24} height={24} alt="headphone" />
                    <h2 className="text-lg font-blod text-white-1">{podcast?.views}</h2>
                </figure>
            </header>

            <PodcastDetailPlayer
                isOwner={isOwner}
                podcastId={podcast._id}
                audioUrl={podcast.audioUrl}
                podcastTitle={podcast.podcastTitle}
                author={podcast.author}
                imageUrl={podcast.imageUrl}
                authorimg={podcast.authorimg}
                authorId={podcast.authorId}
            />
        </section>
    );
};

export default Podcast;
