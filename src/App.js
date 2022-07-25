import React from 'react';
import './App.css';
import ResidentsList from './Components/ResidentsList';
import Search from './Components/Search';
import Error from './Components/Error';
import 'h8k-components';
import { useEffect, useState } from 'react';

const title = "Hacker Dormitory";
function App() {
  const [residents, setResidents] = useState([]);
  const [error, setError] = useState('')

  const addResidentStudent = (data)=>{
     if(data.error){
       setError(data.error);
       return
     }else{
       setResidents([...residents, data.student])
     }
  }

  return (
    <div className="App">
        <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-column justify-content-center align-items-center w-50 mx-auto">
        <Search addResidentStudent={(data)=>addResidentStudent(data)} />
        {error&&<Error message={error}/>}
        <ResidentsList residents={residents} />
      </div>
    </div>
  );
}

export default App;
