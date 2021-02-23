import logo from './logo.svg';
import './App.css';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import MainPage from "./components/main.component";


function App() {
  return (
    <Router>
       <div className="container">
        <Route path="/" exact component={MainPage} />
       </div>
    </Router>
  );
}

export default App;
