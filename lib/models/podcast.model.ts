import { model, models, Schema } from "mongoose";


const podcastSchema = new Schema({

    podcastTitle: {
        type: String,
        required: true,
    },
    podcastDescription: {
        type: String,
        required: true,
    },
    audioUrl: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    authorId:{
        type: String,
        required: true,
      },
    authorimg: {
        type: String,
    },
    imagePrompt: {
        type: String,
    },
    voicePrompt: {
        type: String,
    },
    voiceType: {
        type: String,
    },
    audioDuration: {
        type: Number,
        required: true,
    },
    views: {
        type: Number,
        required: true,
        default:"0"
    },

},
    { timestamps: true }
);

const Podcast = models?.Podcast || model("Podcast", podcastSchema);

export default Podcast;
