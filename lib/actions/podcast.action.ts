"use server";
import { Createpodcastparams } from "@/types";
import { get } from "http";
import OpenAI from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";

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

  
}