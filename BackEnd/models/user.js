import mongoose,{ Schema } from "mongoose";

const UserSchema = mongoose.Schema({
    name: String,
    Phone: String,
    city: String
});

export default mongoose.model("User",UserSchema);