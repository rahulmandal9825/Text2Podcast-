"use client";

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Podcast } from '../types';

const PodcastCard = ({imgUrl , title , description , podcastId} : Podcast) => {
  const router = useRouter()
  const hanndlepodlink = () =>{
      router.push(`/podcasts/${podcastId}`,{
        scroll:true
      })
  }
  return (
    <div className=' cursor-pointer' onClick={hanndlepodlink}>
        <figure className='text-white-1 flex flex-col gap-2'>
            <Image
            src={imgUrl}
            width={200}
            height={200}
            alt='podcastimg'
            className=' aspect-square h-fit w-full rounded-xl 2xl:size-[200px]'
            />
            <div className='flex flex-col'>
              <h1 className='text-sm  truncate font-bold text-white-1  '>{title}</h1>
            <p className='text-sm text-white-3 truncate capitalize'>{description}</p>
            </div>
            
        </figure>
      
    </div>
  )
}

export default PodcastCard
