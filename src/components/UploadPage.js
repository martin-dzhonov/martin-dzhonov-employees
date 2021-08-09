import React, { useState } from 'react';
import { fileToJSON, getMaxOverlapProjects } from '../utils';
import BasicTable from "./BasicTable";
import Button from '@material-ui/core/Button';

export default function UploadPage() {
  let fileReader;

  const [data, setData] = useState();

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  }

  const handleFileRead = (e) => {
    const employeesProjects = fileToJSON(fileReader.result);
    const maxOverlapProjects = getMaxOverlapProjects(employeesProjects);
    setData(maxOverlapProjects);
  }

  return (
    <div className="uploadPageContainer">
      <Button
        variant="contained"
        component="label">
        Upload File
        <input
          type="file"
          hidden
          onChange={e => handleFileChosen(e.target.files[0])} />
      </Button>

      {data?.projects &&
        <div>
          <BasicTable data={data} />
          <div>Total Days: {data.totalDays} </div>
        </div>
      }
    </div>
  )
}