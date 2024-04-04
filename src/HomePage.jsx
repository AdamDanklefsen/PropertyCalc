import ReactDOM from "react-dom/client";
import * as React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { CardHeader } from "@mui/material";
import WelcomePage from './WelcomePage'
import DatabaseView from './DatabaseView'
import Navbar from "./Navbar";
import Calculator from "./Calculator";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";

export default function HomePage() {
    // console.log(useTheme().palette)
  return (
    <Box className="HomePage" bgcolor='background.default'>
        <Navbar pages={["P1", "P2"]}/>
        <Routes>
            <Route exact path="/" element={<WelcomePage />} />
            <Route path="/db" element={<DatabaseView />} />
            <Route path="/calc" element={<Calculator />} />
        </Routes>
        <footer>
            <p>Ralph's Property Calculator &copy; 2024</p>
        </footer>
    </Box>
  )
}

// http://localhost:5173/PropertyCalc/calc?pPrice=225000&Management=0&DownPayment=3.5&mRate=6.25&Rent=1320&MortgageInsurance=.8