

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