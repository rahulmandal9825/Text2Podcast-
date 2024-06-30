"use server";
import { Createpodcastparams } from "@/types";
import { currentUser } from "@clerk/nextjs/server";
import { get } from "http";
import OpenAI from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";
import { connectTodb } from "../database/mongoose";
import { revalidatePath } from "next/cache";
import Podcast from "../models/podcast.model";
import { coerceBoolean } from "openai/core.mjs";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function getAudio(input: string, voice: string | null) {
            console.log(input);
            console.log(voice);

       const mp3 = await openai.audio.speech.create({
        model: "tts-1", 
        voice:voice as SpeechCreateParams['voice'],
        input,
      });

      const buffer = await mp3.arrayBuffer();
      
      return buffer
}

export async function  getImage(imagePrompt:string) {
  
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: imagePrompt,
    n: 1,
    size: "1024x1024",
  });
  const url = response.data[0].url;

  if (!url) {
    throw new Error("Error generateing thumnail");
  }

  const imageResponse = await fetch(url);
  const buffer = await imageResponse.arrayBuffer();

  return buffer

}


export async function CreatePodcast({
  podcastTitle,
            podcastDescription,
            audioUrl,
            imageUrl,
            voiceType,
            imagePrompt,
            voicePrompt,
            views,
            audioDuration
}: Createpodcastparams ){

  const session = await currentUser();
  const FullName = session?.firstName + " " + session?.lastName;


  try {
    connectTodb();

    const newPodcast = new Podcast({
            podcastTitle,
            podcastDescription,
            audioUrl,
            imageUrl,
            author: FullName ,
            authorId: session?.id,
            authorimg: session?.imageUrl,
            voiceType,
            imagePrompt,
            voicePrompt,
            views,
            audioDuration,
    })
    await newPodcast.save();
        revalidatePath("/");
        console.log("podcast is successfully")
    return { success: "Podcast is successfully Add!" }

  } catch (error) {
    console.log(error);
  }
  
}


export async function getPodcast(clerkId:string | null) {
  try {
    connectTodb();
    const Podcasts = await Podcast.find({authorId:clerkId});

    return Podcasts;
  } catch (error) {
    console.log(error);

  }
}

export async function getonePodcast(podcastId:string){


  try {
    connectTodb();
    const Podcasts = await Podcast.findOne({_id:podcastId});

    return Podcasts;
  } catch (error) {
    console.log(error);
  }
}