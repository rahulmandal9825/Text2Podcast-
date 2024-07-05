import React, {useRef, useState} from "react";
import {GeneratePodcastProps} from "../types";
import {toast, useToast} from "./ui/use-toast";
import {Label} from "./ui/label";
import {Textarea} from "./ui/textarea";
import {getAudio} from "../lib/actions/podcast.action";
import {useEdgeStore} from "../lib/edgestore";
import {v4 as uuidv4} from "uuid";
import {Button} from "./ui/button";
import {Flame, Loader} from "lucide-react";
import {cn} from "../lib/utils";
import {SingleImageDropzone} from "./singleimage";
import Image from "next/image";
import {Input} from "./ui/input";
import { Progress } from "@/components/ui/progress"


const useGeneratePodcast = ({setAudio, voiceType, voicePrompt}: GeneratePodcastProps) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const {edgestore} = useEdgeStore();

    const generatepodcast = async () => {
        setIsGenerating(true);
        setAudio("");

        if (!voicePrompt) {
            toast({
                title: "please provide a voiceprompt to generate podcast",
            });
            return setIsGenerating(false);
        }

        try {
            const voice = voiceType;
            const input = voicePrompt;
            const respose = await getAudio(input, voice);

            const blob = new Blob([respose], {type: "audio/mpeg"});
            const fileName = `podcast-${uuidv4()}.mp3`;
            const file = new File([blob], fileName, {type: "audio/mpeg"});

            const res = await edgestore.publicFiles.upload({
                file,
            });
            console.log(res.url);
            setAudio(res.url);
        } catch (error) {
            console.log("error generating podcast", error);
            toast({
                title: "error creating a podcast",
                variant: "destructive",
            });
            setIsGenerating(false);
        }
    };

    return {isGenerating, generatepodcast};
};

const GenratePodcast = (props: GeneratePodcastProps) => {
    const {isGenerating, generatepodcast} = useGeneratePodcast(props);
    const [isAiAudio, setIsAiAudio] = useState(true);
    const {edgestore} = useEdgeStore();
    const [audiourl, setAudiourl] = useState();
    const [progress , setProgress] = useState(0);
    const imageRef = useRef<HTMLInputElement>(null);
    const [isImageLoading, setIsImageLoading] = useState(false);

    const handleuplaod = async (e) => {
        setIsImageLoading(true);
        const file = e.target.files[0];
        try {
            if (file) {
                const res = await edgestore.publicFiles.upload({
                    file,
                    onProgressChange: (progress) => {
                        setProgress(progress);
                    },
                });

                props.setAudio(res.url);
            }
            setIsImageLoading(false);
        } catch (error) {
            // All errors are typed and you will get intellisense for them
            console.log(error);
        }
    };
    return (
        <>
            <div className="bg-black-2 justify-between  flex p-1 w-[250px]  rounded-xl my-2 transition-all  duration-150">
                <Button
                    type="button"
                    onClick={() => setIsAiAudio(true)}
                    className={cn("p-2 rounded-xl", {
                        "bg-black-3": isAiAudio,
                    })}
                >
                    {" "}
                    Text to Audio
                </Button>
                <Button
                    type="button"
                    onClick={() => setIsAiAudio(false)}
                    className={cn("p-2 rounded-xl", {
                        "bg-black-3": !isAiAudio,
                    })}
                >
                    Upload Audio
                </Button>
            </div>
            {isAiAudio ? (
                <>
                    <div className="flex flex-col gap-2 my-5  transition-all  duration-150 ">
                        <Label className="text-lg flex-col gap-2">AI Prompt to generate Podcast</Label>
                        <Textarea
                            className="input-class font-light focus-visible:ring-offset-orange-1"
                            placeholder="provide text to generate audio"
                            rows={6}
                            value={props.voicePrompt}
                            onChange={(e) => props.setVoicePrompt(e.target.value)}
                        />
                    </div>
                    <div className="mt-5 w-full max-w-[200px]">
                        <Button  onClick={generatepodcast} className="p-2 bg-orange-1 rounded-lg my-3">
                            {isGenerating ? (
                                <>
                                    Generating
                                    <Loader size={20} className="animate-spin ml-2" />
                                </>
                            ) : (
                                "Generate"
                            )}
                        </Button>
                    </div>
                </>
            ) : (
            
                    <div
                        className="flex mt-5 h-[150px] w-full cursor-pointer flex-col  gap-3 rounded-xl border-2 border-dashed  transition-all duration-150 border-black-6 bg-black-1"
                        onClick={() => imageRef?.current?.click()}
                    >
                        <Input type="file" className="hidden " ref={imageRef} onChange={(e) => handleuplaod(e)} />
                        {!isImageLoading ? (
                            <>
                                <Image
                                    src="/upload-image.svg"
                                    width={50}
                                    height={50}
                                    alt="upload"
                                    className="self-center m-3"
                                />
                                <div className="flex flex-col items-center gap-1">
                                    <h2 className="text-12 font-bold text-orange-1">Click to upload</h2>
                                </div>
                            </>
                        ) : (
                           
                                <div className="text-2xl flex flex-col h-full self-center mt-12 font-medium text-white-1">
                                    Uploading
                                    <Progress value={progress} />

                                </div>
                            
                        )}
                        {props.audio && (
                            <audio
                                controls
                                src={props.audio}
                                className="hidden "
                                onLoadedMetadata={(e) => props.setAudioDuration(e.currentTarget.duration)}
                            />
                        )}
                    </div>
            )}
            {/* <input type="text" name="audio" className="input-class" value={props.audio} onChange={(e)=>props.setAudio(e.target.value)} />
            {props.audio} */}
        </>
    );
};

export default GenratePodcast;
