"use server";
import { Createpodcastparams } from "@/types";
import { currentUser } from "@clerk/nextjs/server";
import { get } from "http";
import OpenAI from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";
import { connectTodb } from "../database/mongoose";
import { revalidatePath } from "next/cache";
import Podcast from "../models/podcast.model";



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
   await connectTodb();

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

export async function getallPodcast() {
  try {
     await connectTodb();
    const Podcasts = await Podcast.find();

    return Podcasts;
  } catch (error) {
    console.log(error);

  }
}


export async function getPodcast(clerkId:string | null) {
  try {
     await connectTodb();
    const Podcasts = await Podcast.find({authorId:clerkId});

    return Podcasts;
  } catch (error) {
    console.log(error);

  }
}

export async function getonePodcast(podcastId:string){


  try {
    await connectTodb();
    const Podcasts = await Podcast.findOne({_id:podcastId});

    return Podcasts;
  } catch (error) {
    console.log(error);
  }
}

export async function getPodcastbytype(voiceType: SpeechCreateParams['voice']){
  try {
    await connectTodb()
    const podcasts = await Podcast.find({voiceType});

    return podcasts;
  } catch (error) {
    console.log(error)
  }
}

export const getTrendingPodcasts = async () => {
  try {
    // Connect to the database
    await connectTodb();

    // Find the top 8 podcasts with the most views using Mongoose
    const trendingPodcasts  = await Podcast.find({})
      .sort({ views: -1 }) // Sort by `views` descending
      .limit(8); // Limit to the top 8 results
    // Return the trending podcast
    return JSON.parse(JSON.stringify(trendingPodcasts));
  } catch (error) {
    console.error('Error fetching trending podcasts:', error);
    // Re-throw the error for potential handling in the calling code
    throw error;
  }
};