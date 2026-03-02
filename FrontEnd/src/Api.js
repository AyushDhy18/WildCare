import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type":"application/json"
    }
});

export const createReport = async (reportData)=>{
    const response = await API.post("/api/rescue",reportData);
    return response.data;
};

export const getReports = async ()=>{
    const response = await API.get("/api/rescue");
    return response.data;
};

export default API;