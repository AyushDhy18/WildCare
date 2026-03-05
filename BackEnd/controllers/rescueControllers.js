import rescueReport from "../models/rescueReport.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const createReport = async(req,res)=>{
    try {
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);

    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "wildcare_reports" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const uploadedImage = await streamUpload(req.file.buffer);

    const report = {
      ...req.body,
      image: uploadedImage.secure_url
    };

    res.json({
      success: true,
      report
    });
    } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: err.message });    };
};

export const getAllReports = async(req,res)=>{
    const reports = await rescueReport.find().sort({createdAt : -1});
    res.json(reports);
};