import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [dataCopy, setDC] = useState([]);
  const [numOfTxns, setnumOfTxns] = useState(5);
  //fc=> filterCriteria
  const FC = { id: "", title: "", completed: "both" };
  const [fc, setFC] = React.useState(FC);
  const updateFC = (key, value) => {
    setFC({ ...fc, [key]: value });
  };
  React.useEffect(() => {
    // get details and store in the data using setData
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        setData(res.data.slice(0, numOfTxns));
        setDC(res.data);
      })
      .catch((err) => {
        console.error("error", err);
      });
  }, []); // to fetch details on first time only
  useEffect(() => {
    setData(dataCopy.slice(0, numOfTxns));
  }, [numOfTxns]); // shouldComponent update
  const loadMoreData = () => {
    if (dataCopy.length !== numOfTxns) {
      dataCopy.length - numOfTxns > 5
        ? setnumOfTxns(numOfTxns + 5)
        : setnumOfTxns(numOfTxns + (dataCopy.length - numOfTxns));
    }
  };
  const search = () => {
    console.log(fc);
    var res = dataCopy.filter((data) => {
      return (
        data.id.toString() === fc.id &&
        data.title.toLowerCase() === fc.title.toLowerCase()
      );
      //return JSON.stringify(data).includes(fc.title);
      // && (fc.title)?data.title.toLowerCase() === fc.title.toLowerCase():true
    });
    setData(res);
  };
  const dynamicSearch = (value) => {
    var res = dataCopy.filter((data) => {
      return JSON.stringify(data).includes(value);
    });
    setData(res);
  };
  const clear = () => {
    setData(dataCopy);
    setFC(FC);
  };

  return (
    <div className="App">
      <div className="header">
        <div className="logo">
          <h1>TODO</h1>
        </div>
        <div className="searchBar">
          <div className="static">
            <label htmlFor="id">Id:</label>
            <select
              id="id"
              value={fc.id}
              onChange={(e) => updateFC("id", e.target.value)}
            >
              <option id="id_blank" value=""></option>
              {dataCopy.map((data) => (
                <option id={data.id} value={data.id}>
                  {data.id}
                </option>
              ))}
            </select>
            <select
              id="title"
              value={fc.title}
              onChange={(e) => updateFC("title", e.target.value)}
            >
              <option id="title_blank" value=""></option>
              {dataCopy.map((data) => (
                <option id={"title" + data.id} value={data.title}>
                  {data.title}
                </option>
              ))}
            </select>
            <button onClick={() => search()}>Search</button>
            <button onClick={() => clear()}>clear</button>
          </div>
          {/*<label htmlFor="cmpltd">Completed:</label>
          <input type="radio" id="cmpltd" value={""} onChange={()=>console.log("hello")}/>*/}

          <div className="dynamic">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              onChange={(e) => dynamicSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="body">
      {data.length > 0 ? (
        data.map((data) => (
          <div key={data.id}>
            <div
              className="dataCard"
            >
              <p className="userId">{`ID: ${data.id}`}</p>
              <p className="title">{`Title: ${data.title}`}</p>
              <p className="completed" style ={(data.completed)? {color:"green"}:{color:"red"}}>{`isCompleted: ${data.completed.toString()}`}</p>
            </div>
          </div>
        ))
      ) : (
        <div>No record available</div>
      )}
      </div>
      <button
        disabled={dataCopy.length <= numOfTxns}
        style={(dataCopy.length <= numOfTxns)?{hidden:true}:{hidden:false}}
        onClick={() => loadMoreData()}
      >
        Load More
      </button>
    </div>
  );
}

export default App;
