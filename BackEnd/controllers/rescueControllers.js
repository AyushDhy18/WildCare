import rescueReport from "../models/rescueReport.js";

export const createReport = async(req,res)=>{
    try{
        const report = await rescueReport.create(req.body);
        res.json({success:true, report});
    }catch(err){
        res.status(400).json({error: err.message});
    };
};

export const getAllReports = async(req,res)=>{
    const reports = await rescueReport.find().sort({createdAt : -1});
    res.json(reports);
};