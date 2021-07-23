import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
// import SignUp component from Authentication Module
import Signup from  '../Components/Authentication/Signup';
// import welcome 
import Welcome from './welcome';

// import Login
import Login from '../Components/Authentication/login';
// import Forget Password
import ForgotPassword from './Authentication/forgotpassword';
// import Forget Password Change
import ForgotPasswordChange from './Authentication/forgotpasswordchange';

// import UpdatePassword
import UpdatePassword from './Authentication/updatepassword';

// import AccountActivationEmail
import AccountActivationEmail from './Authentication/resendaccountverificationmail';

// import CreatePassword
import CreatePassword from './Authentication/createpassword';
// import Create User
import CreateUser from './Admin/createuser';
// import Navbar
import NavHeader from './Nav';
function Home(){
    return  (
        <div>
            <Router>
                <NavHeader/>
                <Welcome/>
                <div>
                    <Switch>
                    <Route exact path="/" component={Login} />
                        <Route exact path="/login">
                            <Login />
                        </Route>
                        <Route path="/register">
                            <Signup />
                        </Route>
                        <Route path="/resetPassword">
                            <UpdatePassword/>
                        </Route>
                        <Route path='/forgetpassword'>
                            <ForgotPassword/>
                        </Route>
                        <Route path="/forgetpasswordchange">
                            <ForgotPasswordChange/>
                        </Route>
                        <Route path="/resendaccountverificationmail">
                            <AccountActivationEmail/>
                        </Route>
                        <Route path='/updatepassword'>
                            <UpdatePassword/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}


export default Home;