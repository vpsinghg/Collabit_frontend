import React from 'react';
import './App.css';
// import Navbar
import NavHeader from './Components/Nav';
import Navigation from './Components/navigation';
import {sidebarstatus} from './redux/actions/ui.actions';
import {connect} from 'react-redux';
class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      isOpen  : true,
      isMobile  : true,
    }

  }

  updateWidthStatus(){
    const width = window.innerWidth;
    const widthLimit  = 430;
    const isMobile = width <= widthLimit;
    if(isMobile){
      this.setState({
        isOpen :false
      })
    }
    else{
      this.setState({
        isOpen :true
      })
    }
    const {sidebarstatus} =this.props;
    sidebarstatus(this.state.isOpen);  
  }

  componentDidMount(){
    this.updateWidthStatus();
    window.addEventListener("resize", this.updateWidthStatus.bind(this));
  }

  componentWillUnmount(){
  }

  render(){
  return (
    <div className="App">
        <NavHeader  />
      <div style={{paddingTop:"5em"}}>
        <Navigation />
      </div>
    </div>
  );
  }
}

const mapDispatchToProps = dispatch => ({
  sidebarstatus :(newstatus)   =>{
      dispatch(sidebarstatus(newstatus));
  }
});

export default connect(null,mapDispatchToProps)(App);
