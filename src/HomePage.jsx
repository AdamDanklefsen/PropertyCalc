import ReactDOM from "react-dom/client";
import * as React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
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
        <HashRouter>
        <Routes>
            <Route exact path="/" element={<WelcomePage />} />
            <Route path="/db" element={<DatabaseView />} />
            <Route path="/calc" element={<Calculator />} />
        </Routes>
        </HashRouter>
        <footer>
            <p>Ralph's Property Calculator &copy; 2024</p>
        </footer>
    </Box>
  )
}

/*
<h1>Property Calculator</h1>
      
      <TableView data={JsonData}/>
*/