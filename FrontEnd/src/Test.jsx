import { getReports } from './Api';
import { useState } from 'react';
import Loading from './Loading';


const Test = () => {
  const [reportDis,setReportDis] = useState([]);
 
  return (<div >
    <button onClick={async(e)=>{setReportDis(await getReports())}}>
      get
    </button>
          <div className='flex flex-col'>
        {reportDis.map((report) => (
          <div key={report._id} className='flex space-x-4'>
            <p>{report.category}</p>
            <h1>location  </h1>
            <p>{report.location}</p>
            <h1>Time  </h1>
            <p>{report.createdAt}</p>
            <h1>URL  </h1>
            <p>{report.imageUrl}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Test;