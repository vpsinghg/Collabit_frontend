import React,{Component} from 'react';
import axios from 'axios';
import { Row,Form,Col ,Button} from 'react-bootstrap';
// import Formik
import { Formik } from 'formik';
import * as Yup from 'yup';
import { errorMessage } from '../../utils/errResponse';
import { connect } from 'react-redux';
import {Redirect}   from 'react-router-dom';

// Yup validation
const schema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
});
 

class ForgotPassword extends Component{
    constructor(props){
        super(props);
        this.state={
            submitsuccessfull    :  false,
            redirect    :   "",
            errResponse :   "",
            successResponse :   ""
        }
    }


    handleChange    =   (e) =>  {
        this.setState({
            [e.target.name] :   e.target.value
        });
    }

    handleformsubmit=(values, {setSubmitting, resetForm}) => {
        setSubmitting(true);
        const baseUrl = process.env.REACT_APP_Server_baseUrl;
        const targeturl =   baseUrl +'/api/auth/forget_password/';
        axios
            .post(targeturl,values)
            .then((res)=>{
                console.log(res);
                this.setState({
                    errResponse    :   "",
                    successResponse    :   res.data['message'],
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
                        successResponse :   ""
                    })
                }
                else{
                    this.setState({
                        errResponse :   err.response.data.message,
                        successResponse :   ""
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
                <h2 style={{textAlign:'center'}}>Request Password change Mail</h2>
                <div style={{color:"red"}} className="err_response">{this.state.errResponse}</div>
                <div style={{color:"green"}} className="successResponse">{this.state.successResponse}</div>
                <br/>
                <Formik
                    validationSchema={schema}
                    onSubmit={this.handleformsubmit}
                    initialValues={{
                        email   : '',
                    }}
                >
                    {
                        (props)=>{
                            {
                            return(
                                <>
                                {   !this.state.submitsuccessfull &&
                                    <Form
                                        noValidate
                                        onSubmit    =   {props.handleSubmit}
                                    >
                                        <Form.Group as={Row} className="mb-3" controlId="ForgotPasswordEmailID">
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
                                        <Button  variant="primary"   type="submit" disabled={props.isSubmitting}>Send me Mail for Password Update</Button>
                                    </Form>
                                }
                                </>
            
                            )
                        }
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


export default connect(mapStateToProps)(ForgotPassword);