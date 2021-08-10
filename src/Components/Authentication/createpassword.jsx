import React,{Component} from 'react';
import axios from 'axios';
import { Row,Form,Col ,Button} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { errorMessage } from '../../utils/errResponse';
import { connect } from 'react-redux';
import {Redirect}   from 'react-router-dom';

const schema = Yup.object().shape({
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


class CreatePassword extends Component{
    constructor(props){
        super(props);
        this.state={
            submitsuccessfull   :   false,
            redirect    :   "",
            errResponse :   "",
            successResponse :   ""
        }
    }

    handleformsubmit=(values, {setSubmitting, resetForm}) => {
        setSubmitting(true);
        const baseUrl = process.env.REACT_APP_Server_baseUrl;
        const token =   this.props.match.params.token;
        const targeturl =   baseUrl +'/api/auth/create_password/?token='+token;
        axios
            .post(targeturl,values)
            .then((res)=>{
                this.setState({
                    errResponse    :   "",
                    successResponse    :   res.data['message'] ,
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
                setSubmitting(false);
                if(err.response.status  === 422){
                    this.setState({
                        errResponse :   errorMessage(err.response.data)
                    })
                }
                if(err.response.status  === 403){
                    this.setState({
                        errResponse :   err.response.data['message']
                    })
                }
            });
    }


    render(){
        return(
            this.props.isLoggedIn 
            ? <Redirect to="/profile"/>
            :
            <div
                className="container authcontainer"
            >
                <h2 style={{textAlign:'center'}}>Create Password</h2>
                <div className="err_response" style={{color :   'red'}}>{this.state.errResponse}</div>
                <div className="successResponse " style={{color :   'green'}}>{this.state.successResponse}</div>
                <br/>
                <Formik
                    validationSchema={schema}
                    initialValues   =   {{
                        password    :   '',
                        password_confirmation   :   ''
                    }}
                    onSubmit={this.handleformsubmit}
                >
                    {(props)=>{
                        return(
                            <>
                                {!this.state.submitsuccessfull &&
                                    <Form
                                        noValidate
                                        onSubmit    =   {props.handleSubmit}
                                    >
                                        <Form.Group as={Row} className="mb-3" controlId="CreatePasswordPassword">
                                            <Form.Label column sm={2}>
                                                Password
                                            </Form.Label>
                                            <Col sm={10}>
                                                <Form.Control   
                                                    type    =   "password"
                                                    placeholder =   "Enter Password"
                                                    name    =   "password"
                                                    value   =   {props.values.password}
                                                    onChange    =   {props.handleChange}
                                                    isInvalid   =   {!!props.errors.password}
                                                />
                                                <Form.Control.Feedback type="invalid">{props.errors.password}</Form.Control.Feedback>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="CreatePasswordPasswordConfirmation">
                                            <Form.Label column sm={2}>
                                                Confirm Password
                                            </Form.Label>
                                            <Col sm={10}>
                                                <Form.Control   
                                                    type    =   "password"
                                                    placeholder =   "Enter re-enter your Password"
                                                    name    =   "password_confirmation"
                                                    value   =   {props.values.password_confirmation}
                                                    onChange    =   {props.handleChange}
                                                    isInvalid   =   {!!props.errors.password_confirmation}
                                                />
                                                <Form.Control.Feedback type="invalid">{props.errors.password_confirmation}</Form.Control.Feedback>
                                            </Col>
                                        </Form.Group>
                                        <Button variant="primary"   type="submit">Create Password</Button>
                                    </Form>
                                }
                            </>
                        )
                    }}
                </Formik>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
    }
}


export default connect(mapStateToProps)(CreatePassword);