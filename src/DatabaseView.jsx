import TableView from "./TableView";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function WelcomePage() {
  const JsonData = {
    Elements: [
      {
        address: "123 Example st",
        ListPrice: 0,
        DownPayment: 0,
        mRate: 0,
        Term: 0,
        LoanPmt: 0,
        pTaxes: 0,
        MortgageInsurance: 0,
        Insurance: 0,
        MortgagePmt: 0,
        Units: 0,
        TotalRent: 0,
        Beds: 0,
        Baths: 0,
        CapEx: 0,
        Vacancy: 0,
        Maintenance: 0,
        Reserves: 0,
        NOI: 0,
        CapRate: 0,
        CashFlow: 100,
      }
    ],
  };

  const [catFact, setCatFact] = useState(JsonData);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/api/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to authenticate");
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful authentication
        const d = {
            Elements: data
        }
        setCatFact(d);
      })
      .catch((error) => {
        // Handle authentication error
        console.error("Authentication error:", error);
      });
  }, []);

  return (
    <div>
      <h1>This is the DatabaseView Page</h1>
      <TableView data={catFact}></TableView>
    </div>
  );
}

function testPush() {
    console.log('Trying Push')
    fetch('http://127.0.0.1:8000/api/api/',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            address: "100 Street st",
            ListPrice : 420000,
            cashflow : 1000
        })
    })
}
