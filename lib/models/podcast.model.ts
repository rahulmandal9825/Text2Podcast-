import { model, models, Schema } from "mongoose";


const podcastSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
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

    },
    imageUrl: {
        type: String,
    },
    author: {
        type: String,
        required: true,
    },
    authorId:{
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    authorimg: {
        type: String,
        required: true,
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
