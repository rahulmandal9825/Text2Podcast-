"use client";

import { cn } from '@/lib/utils'
import { useAudio } from '@/provider/AudioProvider'
import React, { useEffect, useRef, useState } from 'react'
import { Progress } from './ui/progress';
import Image from 'next/image';
import Link from 'next/link';
import { formatTime } from '@/lib/formatTime';




const PodcastPlayer = () => {
    const {audio, setAudio} = useAudio();
    // console.log(audio);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(20);
    const [duration, setDuration] = useState(100);
    const [isMuted, setIsMuted] = useState(false);

    const handleclosePlayer= () =>{
        setAudio(undefined);
    }

    const toggleplay = () =>{
        if (audioRef.current?.paused) {
            audioRef.current?.play();
            setIsPlaying(true);
        }else{
            audioRef.current?.paused
            setIsPlaying(false);
        }
    }

    const togglemute = () =>{
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted((prev) => !prev);
        }
    }

    const forward = () => {
        if (
            audioRef.current && 
            audioRef.current.currentTime &&
            audioRef.current.duration && 
            audioRef.current.currentTime + 5 < audioRef.current.duration
        ) {
            audioRef.current.currentTime += 5;
        }

    };


    const rewind = () =>{
        if (
            audioRef.current && audioRef.current.currentTime - 5 > 0
        ) {
            audioRef.current.currentTime -= 5;
        } else if (audioRef.current) {
            audioRef.current.currentTime = 0
        }

    };


    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }

    };

    const handleAudioEnded = () =>{
        setIsPlaying(false);
    }

    useEffect(() => {
      const updatecurrentTime = () => {
        if(audioRef.current){
            setCurrentTime(audioRef.current.currentTime);
        }
      };
      const audioElement = audioRef.current;
      if (audioElement) {
        audioElement.addEventListener("timeupdate" , updatecurrentTime);
      }
    
      return () => {
        audioElement?.removeEventListener("timeupdate" , updatecurrentTime);
      }
    }, []);
    
    
  useEffect(() => {
    const audioElement = audioRef.current;
    if (audio?.audioUrl) {
      if (audioElement) {
        audioElement.play().then(() => {
          setIsPlaying(true);
        });
      }
    } else {
      audioElement?.pause();
      setIsPlaying(true);
    }
  }, [audio]);

  return (
    <div className = {cn( " flex flex-col size-full sticky bottom-0 left-0  text-white-1 " , {
        hidden: !audio?.audioUrl || audio?.audioUrl === "",
    })}>
        <Progress value={(currentTime / duration)*100}
        className='w-full' 
        max={duration}/>
      
        <section className=' relative glassmorphism-black flex h-[113px] w-full items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12'>
        <Image
        src="/cross.svg"
        width={20}
        height={20}
        alt='cross'
        className=' absolute top-3 text-white-1 right-3 cursor-pointer'
        onClick={handleclosePlayer}
        />
            <audio
            ref={audioRef}
            src={audio?.audioUrl}
            className='hidden'
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleAudioEnded}
            />
        <div className='flex gap-3'>
        <Link href={`/podcast/${audio?.podcastId}`}>
            <Image
              src={audio?.imageUrl! || "/player1.png"}
              width={64}
              height={64}
              alt="player1"
              className="aspect-square rounded-xl"
            />
          </Link>
          <div className='flex flex-col w-[160px]'>
            <h2 className='text-lg text-white-1 truncate font-semibold' >{audio?.title}</h2>
            <p className='text-sm text-white-2 font-normal'>{audio?.author}</p>
          </div>
        </div>
        <div className='flex gap-3'>
            <div className='flex items-center gap-1 cursor-pointer'>
                <Image
                src='/reverse.svg'
                width={35}
                height={35}
                alt='reverse img'
                onClick={rewind}
                />
                <p className='text-[10px] text-white-3'>-5</p>
            </div>
            <div className='flex items-center gap-1 cursor-pointer'>
                <Image
                src={isPlaying ? "/Pause.svg" : "/Play.svg"}
                width={35}
                height={35}
                alt='reverse img'
                onClick={toggleplay}
                />
            </div>
            <div className='flex items-center gap-1 cursor-pointer'>
            <p className='text-[10px] text-white-3'>+5</p>
                <Image
                src='/forward.svg'
                width={35}
                height={35}
                alt='reverse img'
                onClick={forward}
                />
              
            </div>
        </div>

        <div className='flex items-center gap-3'>
            <h1>
               {formatTime(currentTime)} / {formatTime(duration)}
            </h1>
        <div>
            <Image
            src={ isMuted ? "/unmute.svg" : "/mute.svg"}
            width={25}
            height={25}
            alt='mute'
            onClick={togglemute}
            />
        </div>
        </div>

        </section>

    </div>
  )
}

export default PodcastPlayer
