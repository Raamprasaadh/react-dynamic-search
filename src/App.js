import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  const [data, setData] = useState([]);
  const [dataCopy, setDC] = useState([]);
  const [numOfTxns, setnumOfTxns] = useState(5);
  //dst=> dynamic search term
  const [dst, setDST] = useState();
  //fc=> filterCriteria
  const FC = { id: "", title: "", completed: "both" };
  const [fc, setFC] = React.useState(FC);
  
  
  
  
  React.useEffect(() => {
    // get details and store in the data using setData
    //move this axios get to a separate function //suggestion
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
    //there should be validation for id and 
    //filter using multiple json keys//suggestion
    var res = dataCopy.filter((data) => {
      return (
        data.id.toString() === fc.id &&
        data.title.toLowerCase() === fc.title.toLowerCase()
      );
    });
    setData(res);
  };

  const dynamicSearch = (value) => {
    var res = dataCopy.filter((data) => {
      return JSON.stringify(data).includes(value);
    });
    setData(res);
    setDST(value)
  };
  const clear = () => {
    setData(dataCopy);
    setFC(FC);
  };
  const updateFC = (key, value) => {
    setFC({ ...fc, [key]: value });
  };
  //related to UI
  function StaticSearch() {
    return (
      <div className="static">
        <h3> Static search</h3>
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
        <label htmlFor="staticTitle">Title:</label>
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
    );
  }

  function DynamicSearch() {
    return (
      <div className="dynamic">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={dst}
          onChange={(e) => {dynamicSearch(e.target.value)}}
        />
      </div>
     );
   }
  return (
    <div className="App">
      <div className="header">
        <div className="logo">
          <h1>TODO</h1>
        </div>
        <div className="searchBar">
          <StaticSearch />
          <DynamicSearch />
          <div className="dynamic">
        <label htmlFor="title">Title-in:</label>
        <input
          type="text"
          id="title"
          value={dst}
          onChange={(e) => {dynamicSearch(e.target.value)}}
        />
      </div>
        </div>
      </div>
      <div className="body">
        {data.length > 0 ? (
          data.map((data) => (
            <div key={data.id}>
              <div className="dataCard">
                {(data.completed)?<FontAwesomeIcon icon="far-solid far-check" />:<FontAwesomeIcon icon="far-solid far-calendar-circle-exclamation" />}
                <p className="userId">{`ID: ${data.id}`}</p>
                <p className="title">{`Title: ${data.title}`}</p>
                {/** movestyle to class name and add styles// suggestion */}
                <p
                  className={`completed`}
                  style={data.completed ? { color: "green" } : { color: "red" }}
                >{`isCompleted: ${data.completed.toString()}`}</p>
              </div>
            </div>
          ))
        ) : (
          <div>No record available</div>
        )}
      </div>
      {(dataCopy.length <= numOfTxns)&&<button
        disabled={dataCopy.length <= numOfTxns}
        style={
          dataCopy.length <= numOfTxns ? { hidden: true } : { hidden: false }
        }
        onClick={() => loadMoreData()}
      >
        Load More
      </button>}
    </div>
  );
}

export default App;
