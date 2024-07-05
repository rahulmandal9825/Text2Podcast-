"use client";

import {getTrendingPodcasts} from "@/lib/actions/podcast.action";
import {podcastparams} from "@/types";
import Image from "next/image";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";

const PodcastcardList = () => {
    const [trendingPodcasts, setTrendingPodcasts] = useState<podcastparams[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const router = useRouter();


    useEffect(() => {
        const fetchTrendingPodcasts = async () => {
            try {
                const podcasts = await getTrendingPodcasts();
                setTrendingPodcasts(podcasts);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrendingPodcasts();
    }, []);
 
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading podcasts: {error.message}</p>;

    return (
        <>
            {trendingPodcasts?.slice(0, 3).map((podcaster) => (
                <div
                    key={podcaster._id}
                    className="flex cursor-pointer mb-5 justify-between mr-5"
                    onClick={() => router.push(`/podcasts/${podcaster._id}`)}
                >
                    <figure className="flex items-center gap-2">
                        <Image
                            src={podcaster.imageUrl}
                            alt={podcaster.author}
                            width={44}
                            height={44}
                            className="aspect-square rounded-lg"
                        />
                        <div className="flex flex-col gap-1 w-[95px] ">
                        <h2 className="text-sm font-semibold text-white-1 truncate">{podcaster.podcastTitle}</h2>
                        <h2 className="text-xs  text-white-2  ">{podcaster.author}</h2>
                        </div>
                        
                    </figure>
                    <div className="flex items-center ">
                        <p className="text-xs font-normal text-white-2 ">views {podcaster.views}</p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default PodcastcardList;
