"use client";

import { PodcastDetailPlayerProps } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button';

const PodcastDetailPlayer  = ({
   audioUrl,
  podcastTitle,
  author,
  imageUrl,
  isOwner,
  authorimg,
  podcastId,
  authorId,
}: PodcastDetailPlayerProps) => {

  const router = useRouter();

  return (
    <div className="mt-6 flex w-full justify-between max-md:justify-center">
      <div className='w-full flex flex-col gap-8 max-md:items-center md:flex-row'>
        <Image
        src={imageUrl}
        width={500}
        height={500}
        alt='podcast image'
        className='aspect-square rounded-lg md:w-[40%]'
        />
        <div className='flex w-full flex-col gap-5 max-md:item-center md:gap-9'>
        <article className="flex flex-col gap-3 mt-10 max-md:items-start max-md:ml-2 ">
            <h1 className="text-sm font-extrabold tracking-[-0.32px] text-white-1">
              {podcastTitle}
            </h1>
            <figure
              className="flex cursor-pointer items-center  gap-2"
              onClick={() => {
                router.push(`/profile/${authorId}`);
              }}
            >
              <Image
                src={authorimg}
                width={30}
                height={30}
                alt="Caster icon"
                className="size-[30px] rounded-full object-cover"
              />
              <h2 className="text-16 font-normal text-white-3">{author}</h2>
            </figure>
          </article>

          <Button
            
            className="text-16 w-full max-w-[250px] bg-orange-1 font-extrabold text-white-1"
          >
            <Image
              src="/Play.svg"
              width={20}
              height={20}
              alt="random play"
            />{" "}
            &nbsp; Play podcast
          </Button>
        </div>
        <div>
        {isOwner && (
          <div className=' absolute top-1 right-4 md:relative mt-2  '>
            <Image
            src="/three-dots.svg"
            width={100}
            height={100}
            alt='menu'
            className='aspect-square rounded-lg w-[40px] md:w-[80px]   '
            />
          </div>
        )}  


        </div>

      </div>
      
    </div>
  )
}

export default PodcastDetailPlayer 
