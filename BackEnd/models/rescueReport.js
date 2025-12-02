import mongoose, { Schema } from "mongoose";

const rescueReportSchema = new mongoose.Schema({
    category: String,
    location: String,
    city:String,
    imageUrl: String,
    dateTime:String,
    Urgency: Number,
    Notes: String,
    number : String
});
export default mongoose.model("RescueReport", rescueReportSchema);