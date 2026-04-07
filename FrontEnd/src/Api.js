import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export const createReport = async (reportData)=>{
const formData = new FormData();

  Object.keys(reportData).forEach((key) => {
    if (reportData[key] !== null) {
    formData.append(key, reportData[key]);
};
  });
  for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
  const response = await API.post("/api/rescue", formData);
  return response.data;
};

//Get all Reports

export const getReports = async ()=>{
    const response = await API.get("/api/rescue");
    return response.data;
};

//Get Report by id

export const getreportById = async(id)=>{
  const response = await API.get(`/api/rescue/${id}`);
  return response.data;
}

export default API;