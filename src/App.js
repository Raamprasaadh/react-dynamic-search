import './App.css';
import React from 'react';
import axios from 'axios';

function App() {
  const [data, setData]=React.useState([]);
  React.useEffect(()=>{
    // get details and store in the data using setData
    axios.get("https://jsonplaceholder.typicode.com/todos")
    .then((res)=>{setData(res.data)})
    .catch((err)=>{console.error("error",err)})
  },[])// to fetch details on first time only
  return (
    <div className="App">
      
      {
        data.map(data=> <div key= {data.id}>
          <div className="dataCard" style={(data.completed)?{backgroundColor:"green", color:"white"}:{backgroundColor:"red", color:"white"}}>
            <p className="userId">{`ID: ${data.id}`}</p>
            <p className="title">{`Title: ${data.title}`}</p>
             <p className="completed">{`isCompleted: ${data.completed.toString()}`}</p>
            </div>  
        </div>
          
        )
        
      }
    </div>
  );
}

export default App;
