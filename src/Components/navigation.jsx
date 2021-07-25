import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from '../Components/Authentication/login';
import Signup from '../Components/Authentication/Signup';
// import AdminDashboard from './Admin/admindashboard';
import Dashboard from './Admin/index';
import AccountActivationEmail from './Authentication/resendaccountverificationmail';
import ForgotPassword from './Authentication/forgotpassword';
import ForgotPasswordChange from './Authentication/forgotpasswordchange';
import UserDashboard from './NormalUser';
import CreatePassword from './Authentication/createpassword';
class Navigation extends Component {
    constructor(props){
      super(props);
    }

    render() {
      return (
        <div style={{paddingTop:"10rem"}}>
          <Router>
            <Switch>
              <Route exact path="/resendaccountactivationmail">
                {this.props.isLoggedIn ? <Redirect to={"/" + this.props.role} /> : <AccountActivationEmail />}
              </Route>
              <Route exact path="/forgetpassword">
                {this.props.isLoggedIn ? <Redirect to={"/" + this.props.role} /> : <ForgotPassword />}
              </Route>
              <Route  path="/forgetpasswordchange/:token" component={ForgotPasswordChange}>
      
              </Route>
              <Route path="/createpassword/:token" component={CreatePassword}></Route>
              <Route exact path="/login">
                {this.props.isLoggedIn ? <Redirect to={"/" + this.props.role} /> : <Login />}
              </Route>
              <Route exact path="/register">
                {this.props.isLoggedIn ? <Redirect to={"/" + this.props.role} /> : <Signup />}
              </Route>
              <Route path="/admin" >
                {!(this.props.role==='admin') ? <Redirect to= {"/login"}/> : <Dashboard isOpen={this.props.isOpen} toggle={this.props.toggle}/>}
              </Route>
              <Route path="/normal">
                {! this.props.role==='normal' ? <Redirect to= {"/login"}/> : <UserDashboard />}
              </Route>
              <Route  path="/" >
                {!this.props.isLoggedIn ? <Redirect to="/login" /> : <Redirect to={"/" +this.props.role} />}
              </Route>

            </Switch>
          </Router>
          </div>
      )
    }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
      isLoggedIn: state.auth.isLoggedIn,
      role : state.auth.LoggedInUser.role,
  }
}

  
export default  connect(mapStateToProps)(Navigation);