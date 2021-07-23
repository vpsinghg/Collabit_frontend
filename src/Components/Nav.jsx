import React,{Component} from 'react';

import { Navbar ,Nav,Button} from 'react-bootstrap';
import { Link,withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
// import logout
import { logout } from '../redux/actions/auth.actions';
import { connect } from 'react-redux';
export class NavHeader extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    console.log(this.props);
  }
  Logout= ()=>{
    const { logout } = this.props;
    logout();
  };
  render(){
    return(
      <div>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="/">Vmock</Navbar.Brand>
            {this.props.isLoggedIn  ?
            (
              <Nav className="me-auto">
                <Nav.Link href={"/" +this.props.role}>Profile</Nav.Link>
                <Nav.Link onClick={this.Logout}>Logout</Nav.Link>
              </Nav>
            )
            :(
              <Nav className="me-auto">
                <Nav.Link href="/register">SignUp</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href ="/resendaccountactivationmail">Resend Account Activation</Nav.Link>
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