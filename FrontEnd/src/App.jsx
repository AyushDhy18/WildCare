import { useState } from "react";
import HomePage from "./HomePage";
import ReportForm from "./ReportForm";

import { Route, Routes } from "react-router-dom";

function App() {



  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/report" element={<ReportForm/>} />



    </Routes>

    </>
  );
}

export default App;
