import { InferSchemaType, Schema, model } from "mongoose";

const blocklistSchema = new Schema({
    name: { type: String, required: true },
    listOfURL: { type: [String]},
}, { timestamps: true });

type Blocklist = InferSchemaType<typeof blocklistSchema>;

export default model<Blocklist>("Blocklist", blocklistSchema);