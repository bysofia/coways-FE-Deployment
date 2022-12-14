import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserContextProvider } from './Context/UserContext';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from 'react-router-dom';
import { StrictMode } from 'react';

const client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <UserContextProvider>
    <QueryClientProvider client={client}>
      <Router>
       <App />
      </Router>
    </QueryClientProvider>
    </UserContextProvider>
  </StrictMode>  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
