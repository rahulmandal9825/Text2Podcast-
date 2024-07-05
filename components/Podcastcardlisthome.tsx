import { getpodcastbytime } from '@/lib/actions/podcast.action'
import { formatTime } from '@/lib/formatTime';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Podcastcardlisthome = async () => {

 const podcast = await getpodcastbytime();
    
  return (
    <div className='flex flex-col'>
      {podcast?.slice(0,4).map((podcast, index) => (
        <Link href={`/podcasts/${podcast._id}`} key={index} className='flex gap-5 items-center my-3'>
          <div className='flex gap-4 items-center w-[70%] '>
          <h1>{index + 1}</h1>
            <Image
            src={podcast.imageUrl || "/player1.png"}
            width={70}
            height={70}
            alt='podcast imag list'
            className=' aspect-square rounded-lg'
            />
            <h1 className=' '>{podcast?.podcastTitle.slice(0,40)}</h1>
          </div>
          <div className='flex gap-2 items-center w-[10%]'>
            <Image
            src="/headphone.svg"
            width={20}
            height={20}
            alt='handphone'
            />
            <h1>{podcast?.views}</h1>
          </div>
          <div className='flex gap-2 items-center w-[10%]'>
          <Image
            src="/watch.svg"
            width={20}
            height={20}
            alt='watch icon'
            />
            <h1>{formatTime(podcast.audioDuration)}</h1>

          </div>
          

        </Link>
      ))}
       </div>
  )
}

export default Podcastcardlisthome