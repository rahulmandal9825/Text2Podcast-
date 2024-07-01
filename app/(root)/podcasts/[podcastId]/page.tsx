import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import PodcastDetailPlayer from "@/components/PodcastDetailPlayer";
import {getonePodcast, getPodcastbytype} from "@/lib/actions/podcast.action";
import {currentUser} from "@clerk/nextjs/server";
import Image from "next/image";
import {usePathname} from "next/navigation";
import React from "react";

const Podcast = async ({params: {podcastId}}: {params: {podcastId: string}}) => {
    const podcast = await getonePodcast(podcastId);
    const user = await currentUser();
    const similarPodcasts = await getPodcastbytype(podcast?.voiceType);
    const isOwner = user?.id === podcast?.authorId;
    if(!similarPodcasts || !podcast) return <LoaderSpinner />


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
            <div className="my-5">
                <h1 className="text-white-2">{podcast.podcastDescription}</h1>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-white-1 text-xl font-semibold ">Audio Prompt</h1>
                <p className="text-white-3">{podcast?.voicePrompt}</p>
            </div>
            <div className="flex flex-col gap-2 mt-10">
                <h1 className="text-white-1 text-xl font-semibold ">Image Prompt</h1>
                <p className="text-white-3">{podcast?.imagePrompt}</p>
            </div>
            <section className="mt-8 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Similar Podcasts</h1>

        {similarPodcasts && similarPodcasts.length > 0 ? (
          <div className="podcast_grid">
            {similarPodcasts?.map(({ _id, podcastTitle, podcastDescription, imageUrl }) => (
             <PodcastCard
             key={_id}
             imgUrl={imageUrl as string}
             title={podcastTitle}
             description={podcastDescription}
             podcastId={_id}
         />
            ))}
          </div>
        ) : (
          <> 
            <EmptyState 
              title="No similar podcasts found"
              buttonLink="/discover"
              buttonText="Discover more podcasts"
            />
          </>
        )}
      </section>
        </section>
    );
};

export default Podcast;
