import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from '../Components/Authentication/login';
import Signup from '../Components/Authentication/Signup';
// import AdminDashboard from './Admin/admindashboard';
import Dashboard from './Admin/index';
import AccountActivationEmail from './Authentication/resendaccountverificationmail';
import ForgotPassword from './Authentication/forgotpassword';
import ForgotPasswordChange from './Authentication/forgotpasswordchange';
import UserDashboard from './dashboard';
import CreatePassword from './Authentication/createpassword';
import UpdatePassword from './Authentication/updatepassword';
import TaskManagementDashboard from './taskmanagement';
// protected route
import ProtectedRouteComponent from './protectedroutecomponent';
//
import UserprofileDashBoard from './userprofile';
//
import EmailVerificationMailPage from './emailverificationpage';
import Error_404 from './page_404_error';
class Navigation extends Component {
    render() {
      return (
        <Router>
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/register">
              <Signup/>
            </Route>
            <Route exact path="/resendaccountactivationmail">
              <AccountActivationEmail/>
            </Route>
            <Route exact path="/">
              <Login/>
            </Route>
            <Route exact path='/forgetpassword'>
              <ForgotPassword/>
            </Route>
            <Route exact path="/forgotpasswordchange/:token" component={ForgotPasswordChange}>
            </Route>
            <Route exact path="/auth/email_verify/:token" component={EmailVerificationMailPage}>
            </Route>
            <Route exact path="/createpassword/:token" component={CreatePassword}>
            </Route>
            <Route exact path="/profile/users">
              { this.props.role ==="admin" && <ProtectedRouteComponent exact path="/profile/users" component={Dashboard} />}
              { this.props.role !=="admin" &&  <Route component={Error_404}/>}
            </Route>
            <ProtectedRouteComponent  path="/updatepassword" component={UpdatePassword}/>
            <ProtectedRouteComponent exact path="/profile" component={UserDashboard}/>
            <ProtectedRouteComponent exact path="/profile/users" component={Dashboard} />
            <ProtectedRouteComponent exact path="/profile/users/user/:id" component={UserprofileDashBoard} />
            <ProtectedRouteComponent path="/profile/tasks" component={TaskManagementDashboard} />
            <Route component={Error_404}/>
          </Switch>
        </Router>
      )
    }
}
const mapStateToProps = (state) => { 
  return {
      isLoggedIn: state.auth.isLoggedIn,
      role : state.auth.loggedInUser.role,
  }
}

  
export default  connect(mapStateToProps)(Navigation);