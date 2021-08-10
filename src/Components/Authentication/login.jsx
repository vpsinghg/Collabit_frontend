import ReCAPTCHA from "react-google-recaptcha";
import React,   {Component} from 'react';
import {Form,Button, Row,Col,Nav} from 'react-bootstrap';
import axios from 'axios';
import { login } from '../../redux/actions/auth.actions';
import { connect } from 'react-redux';
import { Redirect } from "react-router";
// import Formik
import { Formik } from "formik";
import * as Yup from 'yup';
// import errMessage utils function
import { errorMessage } from "../../utils/errResponse";


// Yup validation
const schema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup
        .string()
        .required("Please enter your password")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
});


class Login extends Component{
    constructor(props) {
        super(props);
        this.state ={
            submitsuccessfull   :   false,
            user    :   null,
            redirect    :   "",
            errResponse :   "",
            successResponse :   "",
            googlerecaptchatoken  :null,
        }
        console.log(this.props);
        this.recaptchaRef = React.createRef();

      }
    

    componentDidMount(){
    }
    onChange    =   (token) =>{
        this.setState({
            googlerecaptchatoken   :   token
        })
    }

    handleformsubmit= async (values, {setSubmitting, resetForm}) => {
        setSubmitting(true);
        if(!this.state.googlerecaptchatoken){
            await this.recaptchaRef.current.executeAsync();
        }
        const baseUrl = process.env.REACT_APP_Server_baseUrl;
        const targeturl =   baseUrl +'/api/auth/login/';
        const user = {
            email: values.email,
            password: values.password,
            grecaptcharesponse  :   this.state.googlerecaptchatoken
        };
        axios
            .post(targeturl,user)
            .then((res)=>{
                localStorage.setItem("token",res.data.token);
                localStorage.setItem("user",JSON.stringify(res.data.user));
                this.setState({
                    submitsuccessfull   :   true
                })
                const { login } = this.props;
                login(res.data.user);
          
            }).catch((err)=>{
                setSubmitting(false);
                resetForm();

                console.log(err);
                if(err.response.status  === 422){
                    this.setState({
                        errResponse :   errorMessage(err.response.data),
                        successResponse :   '',
                    })
                }
                else{
                    this.setState({
                        errResponse :   err.response.data['message'],
                        successResponse :   '',
                    })
                }
                console.log(values);
            });
    
    }
    

    render(){
        const {isLoggedIn} =this.props;
        return(
            isLoggedIn 
            ? <Redirect to="/profile"/>
            :
            <div
                className="container authcontainer"
            >
                <h2 style={{textAlign:'center'}}>Login</h2>
                <div style={{color:"red"}} className="err_response">{this.state.errResponse}</div>
                <div style={{color:"green"}} className="successResponse">{this.state.successResponse}</div>
                <br/>
                <Formik
                    validationSchema={schema}
                    onSubmit={this.handleformsubmit}
                    initialValues={{
                        email   : '',
                        password    :   '',
                    }}
                >
                    {(props) => {
                        return(
                            <>
                                {
                                    !this.state.submitsuccessfull &&
                                    <Form
                                        noValidate
                                        onSubmit    =   {props.handleSubmit}
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
                                                    value   =   {props.values.email}
                                                    onChange    ={props.handleChange}
                                                    isInvalid   ={!!props.errors.email}
                                                />
                                                <Form.Control.Feedback type="invalid">{props.errors.email}</Form.Control.Feedback>
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
                                                    value   =   {props.values.password}
                                                    onChange    =   {props.handleChange}
                                                    isInvalid   ={!!props.errors.password}
                                                />
                                                <Form.Control.Feedback type="invalid" >Password must contain at least 8 characters, one uppercase, one number and one special case character</Form.Control.Feedback>
                                            </Col>
                                        </Form.Group>
                                        <ReCAPTCHA
                                            ref={this.recaptchaRef}
                                            size="invisible"
                                            sitekey= {process.env.REACT_APP_Site_Key}
                                            onChange={(value) => {
                                                this.onChange(value);
                                            }}
                                        />
                                        <Button  variant="primary"   type="submit" disabled={props.isSubmitting}>Login</Button>
                                    </Form>
                                }
                            </>
                        )}
                    }
                </Formik>
                <hr />
                <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
                    <Nav.Link href="/forgetpassword" ><Button>Forgot Password ?</Button></Nav.Link>
                    <Nav.Link href ="/register"><Button>Please SignUp</Button></Nav.Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
    }
  }
  
  
  const mapDispatchToProps = dispatch => ({
    login :(user)   =>{
        dispatch(login(user));
    }
  });
  
 

export default connect(mapStateToProps,mapDispatchToProps)(Login);

