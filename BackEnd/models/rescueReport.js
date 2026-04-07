import mongoose, { Schema } from "mongoose";

const rescueReportSchema = new mongoose.Schema({
    category: String,
    location: String,
    city:String,
    imageUrl: String,
    dateTime:String,
    Urgency: Number,
    Notes: String,
    number : String,
    isEmergency : Boolean,
    status : {
        type : String,
        enum : ["pending", "assigned", "resolved"],
        default :"pending"
    },
    assignedTo : {
        type : Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true});
export default mongoose.model("RescueReport", rescueReportSchema);