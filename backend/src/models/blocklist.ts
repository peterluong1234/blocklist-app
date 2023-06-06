import { InferSchemaType, Schema, model } from "mongoose";

const blocklistSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    name: { type: String, required: true },
    listOfURL: { type: [String]},
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

type Blocklist = InferSchemaType<typeof blocklistSchema>;

export default model<Blocklist>("Blocklist", blocklistSchema);