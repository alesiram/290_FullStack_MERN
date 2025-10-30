import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ✅ Material UI imports
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#b8e0c8", 
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f8bcd0", 
      contrastText: "#4a4a4a",
    },
    background: {
      default: "#fffafc", 
      paper: "#ffffff",
    },
    text: {
      primary: "#white",
      secondary: "#red",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', sans-serif",
    h6: { fontWeight: 600 },
    h4: { fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
});

ReactDOM.render(
  <React.StrictMode>
    {/* Wrap App with ThemeProvider + CssBaseline */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
