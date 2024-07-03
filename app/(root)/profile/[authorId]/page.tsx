import EmptyState from '@/components/EmptyState';
import LoaderSpinner from '@/components/LoaderSpinner';
import PodcastCard from '@/components/PodcastCard';
import Randombutton from '@/components/Randombutton';
import { getPodcast } from '@/lib/actions/podcast.action';
import { getUserbymongoId } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image';
import React from 'react'

const profile =  async ({
  params,
}: {
  params: {
    authorId: string;
  }}) => {

    const userId = params.authorId;
    const user = await getUserbymongoId(userId);
    const podcastsData = await getPodcast(user.clerkId);
    console.log(podcastsData);
  

  return (
    <section className='flex flex-col gap-8 my-10 ' >
      <h1 className='text-xl  font-semibold '>Podcaster Profile</h1>
      <div className='flex gap-10 '>
        <Image
        src={user?.imageUrl || '/player1.png'}
        width={180}
        height={180}
        alt='porfile'
        className=' aspect-square rounded-lg '
        />
        <div className='flex flex-col gap-4'>
            <div className='flex gap-2'>
              <Image
              src="/verified.svg"
              width={15}
              height={15}
              alt='verifed'
              />
              <h1 className='text-sm text-white-2'>Verified Creator</h1>
            </div>
            <h1 className='text-2xl font-semibold'>{user?.Name}</h1>
           <Randombutton podcastsData={podcastsData}/>
            </div>
      </div>
      <div>
        <div>
          <h1 className='text-xl text-white-1 font-semibold'>All Podcasts</h1>
        </div>
        {podcastsData ? (
                    <>
                        {podcastsData.length > 0 ? (
                            <div className="podcast_grid mt-6">
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
                            <EmptyState title="You have not Created any Podcast" buttonLink="/create-podcast"
                             buttonText="Create Podcast" />
                        )}
                    </>
                ) : (
                    <LoaderSpinner />
                )}
      </div>
    </section>
  )
}

export default profile
