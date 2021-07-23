import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// import Navbar
import NavHeader from './Components/Nav';
import Navigation from './Components/navigation';

class App extends React.Component {
  render(){
  return (
    <div className="App">
        <NavHeader />
        <Navigation/>
    </div>
  );
  }
}


export default App;
