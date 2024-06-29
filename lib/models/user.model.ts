import { model, models, Schema } from "mongoose";


const UserSchema = new Schema({
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    Name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);

const User = models?.User || model("User", UserSchema);

export default User;
  