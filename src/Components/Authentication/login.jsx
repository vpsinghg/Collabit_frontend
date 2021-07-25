import ReCAPTCHA from "react-google-recaptcha";
import React,   {Component} from 'react';
import {Form,Button, Row,Col} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios';
import { logout,login } from '../../redux/actions/auth.actions';
import { connect } from 'react-redux';
import store from '../../redux/store';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom";

// import errMessage utils function
import { errorMessage } from "../../utils/errResponse";

const recaptchaRef = React.createRef();

class Login extends Component{
    constructor(props) {
        super(props);
        this.state ={
            email   :   '',
            password    :   '',
            user    :   null,
            validated   :   false,
            loading :   false,
            redirect    :   "",
            errResponse :   "",
            successResponse :   "",
            googlerecaptchatoken  :"",
        }
        console.log(this.props);
      }
    

    componentDidMount(){
    }
    handleChange    =   (e) =>  {
        this.setState({
            [e.target.name] :   e.target.value,
        });
    }
    onChange    =   (token) =>{
        this.setState({
            googlerecaptchatoken   :   token
        })
    }

    handleSubmit    = async  (e) =>  {
        e.preventDefault();
        const form  =   e.currentTarget;
        await recaptchaRef.current.executeAsync();
        if(form.checkValidity()===false){
            e.preventDefault();
            e.stopPropagation();
        }

        this.setState({
            validated   :   true,
        });

        if(form.checkValidity() === true){
            this.setState({loading  :   true},()=>{
                const baseUrl = process.env.REACT_APP_Server_baseUrl;
                const targeturl =   baseUrl +'/api/auth/login/';
                const user = {
                    email: this.state.email,
                    password: this.state.password,
                    grecaptcharesponse  :   this.state.googlerecaptchatoken
                };
                axios
                    .post(targeturl,user)
                    .then((res)=>{
                        console.log(res);
                        this.setState({
                            loading :   false,
                        });
                        localStorage.setItem("token",res.data.token);
                        localStorage.setItem("user",JSON.stringify(res.data.user));
                        this.setState({
                            user    :   res.data.user
                        });
                        const { login } = this.props;
                        login(res.data.user);
                        this.setState({
                            errResponse :   "",
                            successResponse :   res.data['message']
                        });

                        if(res.data.user.role   === "admin")    {
                            this.setState({
                                redirect    :   '/admin',
                            });
                        }
                        else{
                            this.setState({
                                redirect    :   '/user',
                            });
                        }
                    }).catch((err)=>{
                        console.log(err);
                        this.setState({loading  :   false});
                        this.setState({
                            validated   :   false,
                        });
                        if(err.response.status  === 422){
                            this.setState({
                                errResponse :   errorMessage(err.response.data)
                            })
                        }
                        else{
                            this.setState({
                                errResponse :   err.response.data['message'],
                            })
                        }
                    });
    
            });
        }
    }
    

    render(){
        const conatiner_style={
            maxWidth:"60%",
            backgroundColor:"white",
            borderRadius    :   "10px",
            boxShadow   :   "0px 0px 10px -2px rgba(0,0,0,0.55)",
            padding : "2rem"
        };
        const submit_button_style ={
        };
        return(
            <div
                className="container"
                style={conatiner_style}
            >
                <h2 style={{textAlign:'center'}}>Login</h2>
                <div style={{color:"red"}} className="err_response">{this.state.errResponse}</div>
                 <div style={{color:"green"}} className="successResponse">{this.state.successResponse}</div>
                 <br/>

                 <Form
                    noValidate
                    validated   =   {this.state.validated} 
                    onSubmit    =   {this.handleSubmit}
                >
                    <Form.Group as={Row} className="mb-3" controlId="LoginEmailID">
                        <Form.Label column sm={2}>
                            Email
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control   
                                type    =   "email"
                                placeholder =   "Enter your Email id"
                                name    =   "email"
                                value   =   {this.state.email}
                                onChange    =   {this.handleChange}
                                required
                            />

                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="LoginPassword">
                        <Form.Label column sm={2}>
                            Password
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control   
                                type    =   "password"
                                placeholder =   "Enter your Password"
                                name    =   "password"
                                value   =   {this.state.password}
                                onChange    =   {this.handleChange}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        size="invisible"
                        sitekey= {process.env.REACT_APP_Site_Key}
                        onChange={this.onChange}
                    />



                    {
                    this.state.loading ?
                        (<Spinner animation="border" role="status">
                        <span className="visually-show">Loading...</span>
                      </Spinner>)   :
                      (
                        <Button style={submit_button_style} variant="primary"   type="submit">Login</Button>
                      )
                    }
                </Form>
                <hr />
                <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
                    <a href="/forgetpassword">Forgot Password</a>
                    <a href="/register" >Don't have an account? Please SignUp</a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
  }
  
  
  const mapDispatchToProps = dispatch => ({
    login :(user)   =>{
        dispatch(login(user));
    }
  });
  
 

export default connect(mapStateToProps,mapDispatchToProps)(Login);

