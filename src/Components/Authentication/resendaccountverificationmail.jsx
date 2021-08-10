import React,{Component} from 'react';
import axios from 'axios';
import { Row,Form,Col ,Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { errorMessage } from '../../utils/errResponse';

const schema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
});

class AccountActivationEmail extends Component{
    constructor(props){
        super(props);
        this.state={
            submitsuccessfull   :   false,
            redirect    :   "",
            errResponse :   "",
            successResponse :   ""
        }
    }
    handleformsubmit= async (values, {setSubmitting, resetForm}) => {
        setSubmitting(true);
        const baseUrl = process.env.REACT_APP_Server_baseUrl;
        const targeturl =   baseUrl +'/api/auth/request_account_activation_mail/';
        axios
            .post(targeturl,values)
            .then((res)=>{
                this.setState({
                    errResponse    :   "",
                    successResponse    :   res.data['message'] 
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
                        errResponse :   errorMessage(err.response.data),
                        successResponse :   ''
                    });
                }
                else if(err.response.status  === 403){
                    this.setState({
                        errResponse :   err.response.data['message'],
                        successResponse :   ''
                    })
                }
                else if(err.response.status  === 403){
                    this.setState({
                        errResponse :   err.response.data['message'],
                        successResponse :   ''
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
                <h2 style={{textAlign:'center'}}>Request Account Verification Mail</h2>
                <div className="err_response"   style={{color   :   'red'}}>{this.state.errResponse}</div>
                <div className="successResponse"    style={{color   :   'green'}}>{this.state.successResponse}</div>
                <br/>
                <Formik
                    validationSchema    =   {schema}
                    initialValues   =   {{
                        email   :   '',
                    }}
                    onSubmit    =   {this.handleformsubmit}
                >   
                {
                    (props)=>{
                        return(
                            <>
                                {
                                    !this.state.submitsuccessfull &&
                                    <Form
                                        noValidate
                                        onSubmit    =   {props.handleSubmit}
                                    >
                                        <Form.Group as={Row} className="mb-3" controlId="AccountActivationEmailId">
                                            <Form.Label column sm={2}>
                                                Email
                                            </Form.Label>
                                            <Col sm={10}>
                                                <Form.Control   
                                                    type    =   "email"
                                                    placeholder =   "Enter your Email id"
                                                    name    =   "email"
                                                    value   =   {props.values.email}
                                                    onChange    =   {props.handleChange}
                                                    isInvalid   =   {!!props.errors.email}
                                                />
                                                <Form.Control.Feedback type="invalid">{props.errors.email}</Form.Control.Feedback>
                                            </Col>
                                        </Form.Group>
                                        <Button variant="primary"   type="submit" disabled={props.isSubmitting}>Send me Mail for Account Activation</Button>
                                    </Form>
                
                                }
                            </>
                        )
                    }
                    
                }
                </Formik>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        isLoggedIn: state.auth.isLoggedIn,
    }
}
  
  
  


export default connect(mapStateToProps)(AccountActivationEmail);