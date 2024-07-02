import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import Search from "@/components/Search";
import {getSearchPodcast} from "@/lib/actions/podcast.action";
import React from "react";

const discover = async ({searchParams: {search}}: {searchParmas: {search: string}}) => {
    const query = search || "";

    const podcastsData = await getSearchPodcast({query});

    return (
        <div className="flex flex-col mt-10 ">
            <Search />
            <div>
                <h1 className="text-xl font-semibold text-white-2 my-5">
                    {!search ? "Discover Trending Podcasts" : "Search results for "}
                    {search && <span className="text-white-1">{search}</span>}
                </h1>
                {podcastsData ? (
                    <>
                        {podcastsData.length > 0 ? (
                            <div className="podcast_grid">
                                {podcastsData?.map(({_id, podcastTitle, podcastDescription, imageUrl}) => (
                                    <PodcastCard
                                        key={_id}
                                        imgUrl={imageUrl!}
                                        title={podcastTitle}
                                        description={podcastDescription}
                                        podcastId={_id}
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyState title="No results found" />
                        )}
                    </>
                ) : (
                    <LoaderSpinner />
                )}
            </div>
        </div>
    );
};

export default discover;
