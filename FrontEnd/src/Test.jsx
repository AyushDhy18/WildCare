import { getReports } from './Api';
import { useState } from 'react';


const Test = () => {
  const [reportDis,setReportDis] = useState([]);
 
  return (<>
    <button onClick={async(e)=>{setReportDis(await getReports())}}>
      get
    </button>
          <div className='flex flex-col'>
        {reportDis.map((report) => (
          <div key={report._id} className='flex space-x-4'>
            <p>{report.category}</p>
            <p>{report.location}</p>
            <p>{report.createdAt}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Test;