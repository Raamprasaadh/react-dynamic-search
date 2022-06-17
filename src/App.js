import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DynamicSearch from "./Components/DynamicSearch";
import StaticSearch from "./Components/StaticSearch";
import Body from "./Components/Body";

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
  return (
    <div className="App">
      <div className="header">
        <div className="logo">
          <h1>TODO</h1>
        </div>
        <div className="searchBar">
          <StaticSearch fc={fc} dataCopy={dataCopy} updateFC={updateFC} search={search} clear={clear}/>
          <DynamicSearch dynamicSearch={dynamicSearch} dst={dst}/>
        </div>
      </div>
      <Body data={data} />
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
