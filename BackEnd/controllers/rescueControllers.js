import rescueReport from "../models/rescueReport.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// Creating Reports .....................

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

    let imageURL = null;

    if (req.file) {
    const uploadedImage = await streamUpload(req.file.buffer);
    imageURL = uploadedImage.secure_url
    };

    const report = new rescueReport({
      ...req.body,
      imageUrl: imageURL
    });

    await report.save();

    res.json({
      success: true,
      report
    });
    } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: err.message });    };
};

//Getting all reports .............

export const getAllReports = async(req,res)=>{
    const reports = await rescueReport.find().select("category city dateTime Urgency status isEmergency").sort({createdAt : -1});
    res.json(reports);
};

//Getting Report by id ...............

export const getreportById = async(req,res)=>{
    try{
      const {id} = req.params;
      const report = await rescueReport.findById(id);
      
      if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(report);

  }catch (err) {
    res.status(500).json({ message: "Error fetching report detail" });
  }
};
