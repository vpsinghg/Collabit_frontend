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
import UserDashboard from './NormalUser';
import CreatePassword from './Authentication/createpassword';
import TaskManagementDashboard from './taskmanagement';
// protected route
import ProtectedRouteComponent from './protectedroutecomponent';
//
import UserprofileDashBoard from './userprofile';

import Error_404 from './page_404_error';
class Navigation extends Component {
    render() {
      return (
        <div style={{paddingTop:"5rem"}}>
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
              <Route exact path="/createpassword/:token" component={CreatePassword}>
              </Route>
              <ProtectedRouteComponent exact path="/profile" component={UserDashboard}/>
              <ProtectedRouteComponent exact path="/profile/users" component={Dashboard} />
              <ProtectedRouteComponent path="/profile/users/user/:id" component={UserprofileDashBoard} />
              <ProtectedRouteComponent path="/profile/tasks" component={TaskManagementDashboard} />
              <Route component={Error_404}/>
            </Switch>
          </Router>
          </div>
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