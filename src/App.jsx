import { useState } from 'react'
import './App.css'
import TableView from './TableView.jsx'

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  const JsonData = { 
    "Elements": [
        {
            "id": 0,
            "number": 123,
            "street": "Cherry",
            "suf": "st",
            "ListingPrice": 100000,
            "CashFlow": 100
        },
        {
            "id": 1,
            "number": 100,
            "street": "Michigan",
            "suf": "av",
            "ListingPrice": 1000000,
            "CashFlow": 1000
        },
        {
            "id": 2,
            "number": 69,
            "street": "Miranda",
            "suf": "dr",
            "ListingPrice": 150000,
            "CashFlow": 500
        }
    ]   
};
  return (
    <BrowserRouter>
      <Routes>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App

/*
<h1>Property Calculator</h1>
      
      <TableView data={JsonData}/>
*/