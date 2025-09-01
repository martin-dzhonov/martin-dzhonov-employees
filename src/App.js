import './App.css';
import EmployeesTable from './EmployeesTable';
import { useCSVReader } from './useCSVReader';
import { useState } from 'react';

function App() {
  const { data, handleFileUpload } = useCSVReader();
  const [fileName, setFileName] = useState('No File Uploaded');

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      handleFileUpload(e);
    }
  };

  return (
    <div className="App">
      <label className="file-input-wrapper">
        <span className="file-input-label">Select CSV File</span>
        <input type="file" accept=".csv" onChange={handleFileChange} />
      </label>

      <div className="file-name">{fileName}</div>

      {data && <EmployeesTable data={data} />}
    </div>
  );
}

export default App;