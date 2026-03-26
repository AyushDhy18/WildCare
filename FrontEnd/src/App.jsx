import { useState } from "react";
import HomePage from "./HomePage";
import ReportForm from "./ReportForm";
import EmergencyReportForm from "./EmergencyReportForm"
import { createReport } from "./Api";
import Test from "./Test";

import { Route, Routes } from "react-router-dom";

function App() {
  const [isLoading,setIsLoading] = useState(false);

  const handleSubmit = async (reportData) =>{

    try {
      setIsLoading(true);
      await createReport(reportData);
      alert("The Form has been Submitted !!");
      setIsLoading(false);      
    } catch (error) {
      console.error(error.response?.data || error.message);
    alert("Submission failed ........ Please try again!");
    }
  };

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/report" element={<ReportForm handleSubmit={handleSubmit} isLoading = {isLoading}/>} />
      <Route path="/emergency-report" element={<EmergencyReportForm handleSubmit={handleSubmit} isLoading = {isLoading}/>} />
      <Route path="/test" element={<Test/>}/>
      
      {/* <Route path="*" element={<NotFound />} /> */}


    </Routes>

    </>
  );
}

export default App;
