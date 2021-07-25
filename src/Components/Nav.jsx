import React,{Component} from 'react';

import { Navbar ,Nav,Button} from 'react-bootstrap';
import { Link,withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
// import logout
import { logout } from '../redux/actions/auth.actions';
import { connect } from 'react-redux';

// font awesome icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";

export class NavHeader extends Component{
  constructor(props){
    super(props);
  }
  handleShowSideBar=(e)=>{
    this.props.toggle();
  }
  componentDidMount(){
  }
  Logout= ()=>{
    const { logout } = this.props;
    logout();
  };
  render(){
    return(
      <div>
        <Navbar bg="primary" variant="dark" style={{width:"100%",zIndex:2,position:'fixed'}}>
          <Container>
            <Navbar.Brand href="/">Vmock</Navbar.Brand>
            {this.props.isLoggedIn  ?
            (
              <Nav className="mr-auto">
                <Nav.Link variant="outline-info" onClick={this.props.toggle}>
                  <FontAwesomeIcon icon={faAlignLeft} />
                </Nav.Link>
                <Nav.Link href={"/" +this.props.role}>Profile</Nav.Link>
                <Nav.Link onClick={this.Logout}>Logout</Nav.Link>
              </Nav>
            )
            :(
              <Nav className="me-auto">
                <Nav.Link href="/register">SignUp</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            )
            }
          </Container>
        </Navbar>    
      </div>    
    )
  }
}

const mapStateToProps = (state) => {
  return {
      isLoggedIn: state.auth.isLoggedIn,
      role :  state.auth.LoggedInUser.role
  }
}


const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
  },
});


export default connect(mapStateToProps,mapDispatchToProps)(NavHeader);