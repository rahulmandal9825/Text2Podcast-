"use client";
import React  from 'react';
import { SignedIn, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useAudio } from '@/provider/AudioProvider';
import { cn } from '@/lib/utils';

import Carousel from './Carousel';
import PodcastcardList from './PodcastcardList';


const RightSidebar =  () => {
  const { user } =  useUser();
  const { audio } = useAudio();


  return (
    <div
      className={cn('right_sidebar h-[calc(100vh-5px)]', {
        'h-[calc(100vh-130px)]': audio?.audioUrl,
      })}
    >
      <SignedIn>
        <Link
          href={`/podcasts/${user?.publicMetadata?.userId}`}
          className="flex gap-3 justify-between items-center w-[90%] cursor-pointer hover:bg-black-2 p-3 rounded-lg"
        >
          <div className="flex gap-3 items-center">
            <Image
              src={user?.imageUrl || '/player1.png'}
              width={30}
              height={30}
              alt="user image"
              className="aspect-square rounded-full"
            />
            <h1 className="text-base font-semibold text-white-1">
              {user?.firstName} {user?.lastName}
            </h1>
          </div>
          <Image
            src="/right arrow.svg"
            width={15}
            height={15}
            alt="right arrow"
            className="aspect-square rounded-full"
          />
        </Link>
      </SignedIn>
      <section className='mr-5 mt-3'>
          <Carousel  />
      
      </section>
      <section className='flex flex-col gap-3 mt-8 w-full'>
        <div className='flex w-full justify-between  pr-6 '>
          <h1>Top Podcast</h1>
          <Link href='/discover' className='text-orange-1'> See All</Link>
        </div>
        <PodcastcardList/>
        
      </section>
    </div>
  );
};

export default RightSidebar;
