import TableView from "./TableView";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function WelcomePage() {
  const JsonData = {
    Elements: [
      {
        address: "123 Cherry st",
        ListPrice: 100000,
        cashflow: 100,
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
      <p></p>
    </div>
  );
}
