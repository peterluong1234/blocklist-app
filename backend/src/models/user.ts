import { InferSchemaType, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 6;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
    },
},
{   
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password;
            return ret;
        }
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
})

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);