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

  constructor(props){
    super(props);
    this.state={
      isOpen  : false,
      isMobile  : true,
    }
    this.previousWidth = -1;
    this.toggle =  this.toggle.bind(this);

  }

  updateWidthStatus(){
    const width = window.innerWidth;
    const widthLimit  = 576;
    const isMobile = width <= widthLimit;
    const wasMobile = this.previousWidth <=widthLimit;
    if(isMobile !==wasMobile){
      this.setState({
        isOpen : !isMobile,
      });
    }
    this.previousWidth =  width;
  }

  componentDidMount(){
    this.updateWidthStatus();
    window.addEventListener("resize", this.updateWidthStatus.bind(this));
  }

  componentWillUnmount(){
    window.removeEventListener("resize",this.updateWidthStatus.bind(this));
  }

  // toggle method
  toggle  = () => {
    this.setState({isOpen : !this.state.isOpen});
  }

  render(){
  return (
    <div className="App wrapper">
        <NavHeader  toggle={this.toggle} isOpen={this.state.isOpen}/>
        <Navigation  toggle ={this.toggle} isOpen={this.state.isOpen}/>
    </div>
  );
  }
}


export default App;
