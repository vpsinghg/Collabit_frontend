import React,   {Component} from 'react';
import {Form,Button, Row,Col,Nav} from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {Formik} from 'formik';
import * as Yup from 'yup';
// utils errResponse
import { errorMessage } from '../../utils/errResponse';

const schema = Yup.object().shape({
    name: Yup.string().max(255).required('Required'),
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup
        .string()
        .required("Please enter your password")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    password_confirmation: Yup
        .string()
        .required("Please confirm your password")
        .when("password", {
            is: password => (password && password.length > 0 ? true : false),
            then: Yup.string().oneOf([Yup.ref("password")], "Password doesn't match")
    })
});
  
class Signup extends Component{
        state ={
            submitsuccessfull   :   false,
            redirect    :   "",
            errResponse :   "",
            successResponse :   ""
        }
    

    componentDidMount(){
    }

    handleChange    =   (e) =>  {
        this.setState({
            [e.target.name] :   e.target.value
        });
    }

    handleformsubmit=(values, {setSubmitting, resetForm}) => {
        setSubmitting(true);
        const baseUrl = process.env.REACT_APP_Server_baseUrl;
        const targeturl =   baseUrl +'/api/auth/register/';
        axios
            .post(targeturl,values)
            .then((res)=>{
                this.setState({
                    errResponse    :   "",
                    successResponse    :   res.data.message 
                });
                setTimeout(() => {
                    resetForm();
                    setSubmitting(false);
                }, 100);
                this.setState({
                    submitsuccessfull   :   true
                });    

            })
            .catch((err)=>{
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
    }




    render ()   {
        return(
            this.props.isLoggedIn 
            ? <Redirect to="/profile"/>
            :
            <div
                className="container authcontainer"
            >
                <h2 style={{textAlign:'center'}}>Sign Up</h2>
                <div style={{color:'red'}} className="err_response">{this.state.errResponse}</div>
                <div style={{color:'green'}} className="successResponse">{this.state.successResponse}</div>
                <br/>
                <Formik
                    validationSchema={schema}
                    onSubmit={this.handleformsubmit}
                    initialValues={{
                        name    : '',
                        email   : '',
                        password    :   '',
                        password_confirmation   :   '',
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        isValid,
                        isSubmitting,
                        errors,
                    }) => (
                        <>
                            {
                                !this.state.submitsuccessfull &&

                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalFullname">
                                        <Form.Label column sm={2}>
                                            FullName
                                        </Form.Label>
                                        <Col sm={10}>
                                            <Form.Control   
                                                type    =   "text"
                                                placeholder =   "Enter your Full Name"
                                                name    =   "name"
                                                onChange    =   {handleChange}
                                                value   =   {values.name}
                                                isInvalid={!!errors.name}
                                            />
                                            <Form.Control.Feedback type="invalid" >{errors.name}</Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="EmailID">
                                        <Form.Label column sm={2}>
                                            Email
                                        </Form.Label>
                                        <Col sm={10}>
                                            <Form.Control   
                                                type    =   "email"
                                                placeholder =   "Enter your Email id"
                                                name    =   "email"
                                                value   =   {values.email}
                                                onChange    =   {handleChange}
                                                isInvalid   ={!!errors.email}
                                            />
                                            <Form.Control.Feedback type="invalid" >{errors.email}</Form.Control.Feedback>

                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="Password">
                                        <Form.Label column sm={2}>
                                            Password
                                        </Form.Label>
                                        <Col sm={10}>
                                            <Form.Control   
                                                type    =   "password"
                                                placeholder =   "Enter your Password"
                                                name    =   "password"
                                                value   =   {values.password}
                                                onChange    =   {handleChange}
                                                isInvalid   ={!!errors.password}
                                            />
                                            <Form.Control.Feedback type="invalid" >Password must contain at least 8 characters, one uppercase, one number and one special case character</Form.Control.Feedback>

                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="Password_Confirmation">
                                        <Form.Label column sm={2}>
                                            Confirm Password
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control   
                                                type    =   "password"
                                                placeholder =   "Enter Password"
                                                name    =   "password_confirmation"
                                                value   =   {values.password_confirmation}
                                                onChange    =   {handleChange}
                                                isInvalid   ={!!errors.password_confirmation}
                                            />
                                            <Form.Control.Feedback type="invalid" >{errors.password_confirmation}</Form.Control.Feedback>

                                        </Col>
                                    </Form.Group>
                                    <Button type="submit" style={{marginTop:"2rem"}} disabled={isSubmitting}>Submit form</Button>
                                </Form>
                            }
                        </>
                    )}
                </Formik>
                <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
                    <Nav.Link href="/login" ><Button>Login Here</Button></Nav.Link>
                    <Nav.Link href ="/resendaccountactivationmail"><Button>Resend Account Activation</Button></Nav.Link>

                </div>
            </div>
    
        )    
    }
    
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
}
  
  
  
  
export default connect(mapStateToProps)(Signup);