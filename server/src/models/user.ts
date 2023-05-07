import { ObjectId, Schema, model, Model } from "mongoose"

type UserDocument = {
  name: string
  email: string
  password: string
  verified: boolean
  avatar?: { url: string; publicId: string }
  tokens: string[]
  favorites: ObjectId[]
  followers: ObjectId[]
  following: ObjectId[]
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: Object,
      url: String,
      publicId: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Audio" }],
    tokens: [String],
  },
  { timestamps: true }
)

export default model("User", userSchema) as Model<UserDocument>
