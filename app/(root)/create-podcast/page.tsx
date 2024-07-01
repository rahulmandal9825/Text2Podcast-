"use client";

import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useToast} from "@/components/ui/use-toast";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {Loader} from "lucide-react";
import GenratePodcast from "@/components/GenratePodcast";
import GenrateThumbnail from "@/components/GenerateThumbnail";
import {CreatePodcast} from "@/lib/actions/podcast.action";

const voiceCategories = ["alloy", "shimmer", "nova", "echo", "fable", "onyx"];

const formSchema = z.object({
    podcastTitle: z.string().min(2),
    podcastDescription: z.string().min(2),
});

const Createpodcast: React.FC = () => {
    const router = useRouter();
    const [imagePrompt, setImagePrompt] = useState(" ");
    const [imageUrl, setImageUrl] = useState(" ");
    const [audioUrl, setAudioUrl] = useState(" ");
    const [audioDuration, setAudioDuration] = useState(0);
    const [voiceType, setVoiceType] = useState<string | null>(null);
    const [voicePrompt, setVoicePrompt] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {toast} = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            podcastTitle: "",
            podcastDescription: "",
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            setIsSubmitting(true);
            if (!audioUrl || !imageUrl || !voiceType) {
                toast({
                    title: "Please generate audio and image",
                });
                setIsSubmitting(false);
                throw new Error("Please generate audio and image");
            }
            const podcast = await CreatePodcast({
                podcastTitle: data.podcastTitle,
                podcastDescription: data.podcastDescription,
                audioUrl,
                imageUrl,
                voiceType,
                imagePrompt,
                voicePrompt,
                views: 0,
                audioDuration,
            });

            toast({
                title: "Podcast created",
                className: "custom-toast"
            });
            setIsSubmitting(false);
            router.push("/");
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                variant: "destructive",
            });
            setIsSubmitting(false);
        }
    }

    return (
        <section className="mt-10 flex flex-col text-white-1">
            <h1 className="text-3xl font-bold text-white-1">Create a Podcast</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-10">
                    <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
                        <FormField
                            control={form.control}
                            name="podcastTitle"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-semibold">Podcast Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="input-class focus-visible:ring-offset-orange-1"
                                            placeholder="Title"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-col gap-3">
                            <Label className="font-semibold text-lg">Select your AI Voice</Label>
                            <Select onValueChange={(value) => setVoiceType(value)}>
                                <SelectTrigger className="w-full focus:ring-orange-1 outline-none border-none bg-black-1">
                                    <SelectValue placeholder="Select AI voice" className="placeholder:text-gray-1" />
                                </SelectTrigger>
                                <SelectContent className="border-none bg-black-1 font-bold text-white-1">
                                    {voiceCategories.map((category) => (
                                        <SelectItem
                                            key={category}
                                            value={category}
                                            className="capitalize focus:bg-orange-1"
                                        >
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                                {voiceType && <audio src={`/${voiceType}.mp3`} autoPlay />}
                            </Select>
                        </div>
                        <FormField
                            control={form.control}
                            name="podcastDescription"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-semibold">Podcast Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="input-class focus-visible:ring-offset-orange-1"
                                            rows={8}
                                            placeholder="Description"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <GenratePodcast
                            setAudio={setAudioUrl}
                            voiceType={voiceType}
                            audio={audioUrl}
                            voicePrompt={voicePrompt}
                            setVoicePrompt={setVoicePrompt}
                            setAudioDuration={setAudioDuration}
                        />
                        <GenrateThumbnail
                            setImage={setImageUrl}
                            image={imageUrl}
                            imagePrompt={imagePrompt}
                            setImagePrompt={setImagePrompt}
                        />

                        <div className="mt-10 w-full">
                            <Button
                                type="submit"
                                className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1"
                            >
                                {isSubmitting ? (
                                    <>
                                        Submitting
                                        <Loader size={20} className="animate-spin ml-2" />
                                    </>
                                ) : (
                                    "Submit & Publish Podcast"
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </section>
    );
};

export default Createpodcast;
