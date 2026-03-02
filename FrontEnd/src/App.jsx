import { useState } from "react";
import HomePage from "./HomePage";
import ReportForm from "./ReportForm";
import EmergencyReportForm from "./EmergencyReportForm"
import { createReport } from "./Api";

import { Route, Routes } from "react-router-dom";

function App() {

  const handleSubmit = async (reportData) =>{

    try {
      await createReport(reportData);
      alert("The Form has been Submitted !!");      
    } catch (error) {
      console.error(error.response?.data || error.message);
    alert("Submission failed ........ Please try again!");
    }
  };

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/report" element={<ReportForm handleSubmit={handleSubmit}/>} />
      <Route path="/emergency-report" element={<EmergencyReportForm handleSubmit={handleSubmit}/>} />
      
      {/* <Route path="*" element={<NotFound />} /> */}


    </Routes>

    </>
  );
}

export default App;
