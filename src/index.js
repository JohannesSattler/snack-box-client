import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserProvider } from "./context/UserContext";
import { CheckoutProvider } from "./context/CheckoutContext";

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#9a71ff',
    },
    secondary: {
      main: '#FF8E53',
    },
    success: {
      main: '#4fd254',
      dark: '#4db952',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          color: 'white',
          height: 40,
          padding: '0 30px',
        },
        outlined: {
          backgroundColor: '#fff',
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          height: 40,
          padding: '0 30px',
          "&:hover": {
            backgroundColor: '#fff',
          }
        },
        text: {
          backgroundColor: 'transparent',
          borderRadius: 3,
          height: 40,
          padding: '0 30px',
          "&:hover": {
            boxShadow: '0px 0px 0px 0px #FE6B8B ,0px 2px 0px 0px #FF8E53',
            transition: '0.3s',
          }
        },
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <CheckoutProvider>
            <App />
          </CheckoutProvider>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
