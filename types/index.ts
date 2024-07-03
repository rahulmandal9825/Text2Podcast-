import { Dispatch, SetStateAction } from "react";

export interface Podcast {
    key: number;
    imgUrl: string;
    title: string;
    description: string;
    podcastId: number;
  }

  export interface createUserParams{
    clerkId:string;
    email:string;
    Name:string | null;
    imageUrl:string
  }

  export interface UpdateUserparams{
    Name: string | null;
    photo:string;
  }

  export interface GeneratePodcastProps {
    voiceType: string | null;
    setAudio: Dispatch<SetStateAction<string>>;
    audio: string;
    voicePrompt: string;
    setVoicePrompt: Dispatch<SetStateAction<string>>;
    setAudioDuration: Dispatch<SetStateAction<number>>;
  }

  export interface GenerateThumbnailProps {
    setImage: Dispatch<SetStateAction<string>>;
    image: string;
    imagePrompt: string;
    setImagePrompt: Dispatch<SetStateAction<string>>;
  }

  export interface Createpodcastparams {
    podcastTitle: string;
    podcastDescription: string;
    audioUrl: string;
    imageUrl: string;
    voiceType: string | null;
    imagePrompt: string;
    voicePrompt: string;
    views: number;
    audioDuration: number;
  }
  export interface podcastparams {
    podcastTitle: string;
    podcastDescription: string;
    audioUrl: string;
    imageUrl: string;
    voiceType: string | null;
    imagePrompt: string;
    voicePrompt: string;
    views: number;
    authorId: string;
    audioDuration: number;
    _id:string;
    author:string;
  }

  export interface PodcastDetailPlayerProps{
    audioUrl: string;
    podcastTitle: string;
    author: string;
    imageUrl: string;
    isOwner: boolean;
    authorimg: string;
    podcastId: string;
    authorId: string;

  }
  export interface TopPodcastersProps {
    _id: string;
    imageUrl: string;
    podcastTitle:string;
    author:string;
  }

  export interface CarouselProps {
    fansLikeDetail: TopPodcastersProps[];
  }

  export interface AudioProps {
    title: string;
    audioUrl: string;
    author: string;
    imageUrl: string;
    podcastId: string;
  }
  
  export interface AudioContextType {
    audio: AudioProps | undefined;
    setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>;
  }
  
  export interface EmptyStateProps {
    title: string;
    search?: boolean;
    buttonText?: string;
    buttonLink?: string;
  }

  export interface getsearchPodcast{
    query?: string;
    page?: number;
    limit?: number;
  }

  export interface ProfileCardProps {
    podcastData: PodcastProps[];
  }

  export interface PodcastProps{
    _id: string;
    podcastTitle: string;
    podcastDescription: string;
    audioUrl: string;
    imageUrl:string;
    author: string;
    authorId: string;
    authorimg:string;
    imagePrompt: string;
    voicePrompt: string;
    voiceType: string;

  }