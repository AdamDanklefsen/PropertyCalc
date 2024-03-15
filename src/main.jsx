import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './HomePage.jsx'
import './index.css'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#141b2d',
      secondary: '#1f2a40'
    },
    primary: {
      main: '#6870fa'
    }
  },
  
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <HomePage />
    </ThemeProvider>
  </React.StrictMode>,
)
