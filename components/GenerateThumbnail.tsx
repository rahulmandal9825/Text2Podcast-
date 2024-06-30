import React, {useRef, useState} from "react";
import { GenerateThumbnailProps} from "../types";
import {useToast} from "./ui/use-toast";
import {Label} from "./ui/label";
import {Textarea} from "./ui/textarea";
import {getAudio, getImage} from "../lib/actions/podcast.action";
import {useEdgeStore} from "../lib/edgestore";
import {v4 as uuidv4} from "uuid";
import {Button} from "./ui/button";
import {Loader} from "lucide-react";
import {cn} from "../lib/utils";
import {SingleImageDropzone} from "./singleimage";
import Image from "next/image";
import {Input} from "./ui/input";
import { Progress } from "./ui/progress";

const useGeneratePodcast = ({setImage, imagePrompt}: GenerateThumbnailProps) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const {edgestore} = useEdgeStore();
    const { toast } = useToast();

    const generatepodcast = async () => {
        setIsGenerating(true);
        setImage("");

        if (!imagePrompt) {
            toast({
                title: "please provide a voiceprompt to generate podcast",
            });
            return setIsGenerating(false);
        }

        try {
            const response = await getImage(imagePrompt);
            const blob = new Blob([response], {type: "image/png"});
            const fileName = `thumbnail-${uuidv4()}`;
            const file = new File([blob], fileName, {type: "image/png"});

            const res = await edgestore.publicFiles.upload({
                file,
            });
            setImage(res.url);
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

const GenrateThumbnail = (props: GenerateThumbnailProps) => {
    const {isGenerating, generatepodcast} = useGeneratePodcast(props);
    const {edgestore} = useEdgeStore();
    const [isAiAudio, setIsAiAudio] = useState(true);
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState<File>();
    const [isImageupload, setIsImageupload] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);

    const handleuplaod = async (e) => {
        setIsImageLoading(true);
        try {
            if (file) {
                const res = await edgestore.publicFiles.upload({
                    file,
                    onProgressChange: (progress) => {
                        setProgress(progress);
                    },
                });

                props.setImage(res.url);
            setIsImageupload(true);
            }
            setIsImageLoading(false);
        } catch (error) {
            // All errors are typed and you will get intellisense for them
            console.log(error);
        }
    };
    return (
        <>
            <div className="bg-black-2 justify-between transition-all duration-150 flex p-1 w-[300px] rounded-xl my-2">
                <Button
                    type="button"
                    onClick={() => setIsAiAudio(true)}
                    className={cn("p-2 rounded-xl", {
                        "bg-black-3": isAiAudio,
                    })}
                >
                    {" "}
                    Text to thumbnail
                </Button>
                <Button
                    type="button"
                    onClick={() => setIsAiAudio(false)}
                    className={cn("p-2 rounded-xl", {
                        "bg-black-3": !isAiAudio,
                    })}
                >
                    Upload thumbnail
                </Button>
            </div>
            {isAiAudio ? (
                <>
                    <div className="flex flex-col gap-2 my-5 transition-all duration-150 ">
                        <Label className="text-lg flex-col gap-2">AI Prompt to generate thumbnail</Label>
                        <Textarea
                            className="input-class font-light focus-visible:ring-offset-orange-1"
                            placeholder="provide text to generate audio"
                            rows={6}
                            value={props.imagePrompt}
                            onChange={(e) => props.setImagePrompt(e.target.value)}
                        />
                    </div>
                    <div className="mt-5 w-full max-w-[200px]">
                        <Button  type="submit" onClick={generatepodcast} className="p-2 bg-orange-1 rounded-lg my-3">
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
                <>
                    <div className=" flex mt-5 h-[220px] p-2 w-full  cursor-pointer  gap-3 rounded-xl border-2 border-dashed border-black-6 bg-black-1 transition-all  duration-150">
                        <SingleImageDropzone
                            width={200}
                            height={200}
                            value={file}
                            onChange={(file) => {
                                setFile(file);
                            }}
                        />

                        {!isImageLoading ? (
                            <>
                                {isImageupload ? (
                                    <h1 className=" self-center transition-all  duration-150">Image is uploaded.</h1>
                                ) : (
                                    <button
                                        className="p-2 rounded-lg max-lg:ml-1 ml-20  bg-orange-1 max-lg:w-[200px] h-10 self-center transition-all  duration-150 "
                                        onClick={handleuplaod}
                                    >
                                        Upload thumbnail
                                    </button>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="text-2xl flex flex-col h-full self-center mt-12 font-medium text-white-1 transition-all  duration-150">
                                    Uploading

                                    <Progress value={progress} />

                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default GenrateThumbnail;
