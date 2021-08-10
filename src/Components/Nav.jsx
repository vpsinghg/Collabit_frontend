import React,{Component} from 'react';

import { Navbar ,Nav} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
// import logout
import { logout } from '../redux/actions/auth.actions';
import { connect } from 'react-redux';

// font awesome icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { sidebarstatus } from "../redux/actions/ui.actions";






export class NavHeader extends Component{

  componentDidMount(){
  }

  logout= ()=>{
    const { logout } = this.props;
    logout();
  };

  togglesidebar = (e) =>{
    const {sidebarstatus} = this.props;
    const newstate = ! this.props.isOpen;
    sidebarstatus(newstate);
  }


  render(){
    return(
      <div>
        <Navbar bg="primary" variant="dark" style={{width:"100%",zIndex:2,position:'fixed'}}>
          <Container>
            <Navbar.Brand href="/">Vmock</Navbar.Brand>
            {this.props.isLoggedIn  ?
            (
              <Nav className="mr-auto">
                <Nav.Link variant="outline-info" onClick={this.togglesidebar}>
                  <FontAwesomeIcon icon={faAlignLeft} />
                </Nav.Link>
                <Nav.Link href={"/profile/users/user/"+this.props.loggedInUser.id}>Profile</Nav.Link>
                <Nav.Link onClick={this.logout}>Logout</Nav.Link>
              </Nav>
            )
            :(
              <Nav className="mr-auto">
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
      loggedInUser :state.auth.loggedInUser,
      role :  state.auth.loggedInUser.role,
      isOpen  :   state.ui.sidebarstatusopen,
  }
}


const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
  },
  sidebarstatus:  (newstate)=>{
    dispatch(sidebarstatus(newstate));
  }
});


export default connect(mapStateToProps,mapDispatchToProps)(NavHeader);