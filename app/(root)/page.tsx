
import PodcastCard from "@/components/PodcastCard";
import { currentUser } from "@clerk/nextjs/server";
import { getPodcast } from "@/lib/actions/podcast.action";

export default async function Home() {

    const user = await currentUser();
    const podcastData = await getPodcast(user.id);

    return (
        <main className="mt-9 flex flex-col gap-9 md:overflow-hidden">
            <section className="flex flex-col gap-5">
                <h1 className="text-3xl font-bold text-white-1">Trending Podcast</h1>
                <div className="podcast_grid">
                    {podcastData?.map((podcast) => (
                        <PodcastCard
                            key={podcast._id}
                            imgUrl={podcast.imageUrl as string}
                            title={podcast.podcastTitle}
                            description={podcast.podcastDescription}
                            podcastId={podcast._id}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}
