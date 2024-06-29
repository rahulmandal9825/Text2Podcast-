
import PodcastCard from "@/components/PodcastCard";
import { podcastData } from "../../constants";

export default function Home() {
    return (
        <main className="mt-9 flex flex-col gap-9 md:overflow-hidden">
            <section className="flex flex-col gap-5">
                <h1 className="text-3xl font-bold text-white-1">Trending Podcast</h1>
                <div className="podcast_grid">
                    {podcastData?.map((podcast) => (
                        <PodcastCard
                            key={podcast.id}
                            imgUrl={podcast.imgUrl as string}
                            title={podcast.title}
                            description={podcast.description}
                            podcastId={podcast.id}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}
