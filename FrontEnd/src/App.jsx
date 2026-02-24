import { useState } from "react";
import HomePage from "./HomePage";
import ReportForm from "./ReportForm";
import EmergencyReportForm from "./EmergencyReportForm"

import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/report" element={<ReportForm/>} />
      <Route path="/emergency-report" element={<EmergencyReportForm/>} />
      
      {/* <Route path="*" element={<NotFound />} /> */}


    </Routes>

    </>
  );
}

export default App;
