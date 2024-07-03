"use client";
import { useAudio } from '@/provider/AudioProvider';
import { PodcastProps, ProfileCardProps } from '@/types';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Randombutton = (podcastsData :ProfileCardProps) => {
    const { setAudio } = useAudio();

  const [randomPodcast, setRandomPodcast] = useState<PodcastProps | null>(null);


  const playRandomPodcast = () => {
    const randomIndex = Math.floor(Math.random() * podcastsData.podcastsData.length);

    setRandomPodcast(podcastsData.podcastsData[randomIndex]);
  };

  useEffect(() => {
    if (randomPodcast) {
      setAudio({
        title: randomPodcast.podcastTitle,
        audioUrl: randomPodcast.audioUrl || "",
        imageUrl: randomPodcast.imageUrl || "",
        author: randomPodcast.author,
        podcastId: randomPodcast._id,
      });
    }
  }, [randomPodcast, setAudio]);

  return (
    <button onClick={playRandomPodcast} className='bg-orange-1 p-2 rounded-lg flex gap-3 items-center'>
    <Image
    src="/Play.svg"
    width={20}
    height={20}
    alt='play ramdom'
    

    />
    Play Random Podcast
  </button>
  )
}

export default Randombutton