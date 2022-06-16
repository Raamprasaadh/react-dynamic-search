import './App.css';
import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData]=React.useState([]);
  const [dataCopy, setDC]=React.useState([]);
  //fc=> filterCriteria
  const FC ={id:"", title:"" ,completed:"both"};
  const [fc, setFC] = React.useState(FC);
  const updateFC = (key, value) =>{
    setFC({...fc, [key]:value})
  }
  const search = ()=>{
    var res= dataCopy.filter((data)=>{
      return data.id.toString()===fc.id && data.title.toLowerCase() === fc.title.toLowerCase();
     // && (fc.title)?data.title.toLowerCase() === fc.title.toLowerCase():true
    });
    setData(res)
  }
  const clear = ()=>{
    setData(dataCopy);
    setFC(FC)
  }
  React.useEffect(()=>{
    // get details and store in the data using setData
    axios.get("https://jsonplaceholder.typicode.com/todos")
    .then((res)=>{setData(res.data); setDC(res.data)})
    .catch((err)=>{console.error("error",err)})
  },[])// to fetch details on first time only
  return (
    <div className="App">
      <div className="headerr">
        <div className="logo"><h1>TODO</h1></div>
        <div className="search bar">
          <label htmlFor="id">Id:</label>
          <input type="text" id="id" value={fc.id} onChange={(e)=>updateFC("id", e.target.value)}/>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={fc.title} onChange={(e)=>updateFC("title", e.target.value)}/>
          {/*<label htmlFor="cmpltd">Completed:</label>
          <input type="radio" id="cmpltd" value={""} onChange={()=>console.log("hello")}/>*/}
          <button onClick={()=>search()}>Search</button>
          <button onClick={()=>clear()}>clear</button>
        </div>
      </div>
      {
        (data.length>0)?
        data.map(data=> <div key= {data.id}>
          <div className="dataCard" style={(data.completed)?{backgroundColor:"green", color:"white"}:{backgroundColor:"red", color:"white"}}>
            <p className="userId">{`ID: ${data.id}`}</p>
            <p className="title">{`Title: ${data.title}`}</p>
             <p className="completed">{`isCompleted: ${data.completed.toString()}`}</p>
            </div>  
        </div>
          
        ): <div>No record available</div>
        
      }
    </div>
  );
}

export default App;
