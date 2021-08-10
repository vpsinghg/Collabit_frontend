import React,{Component} from 'react';
import axios from 'axios';
import { Row,Form,Col ,Button} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { errorMessage } from '../../utils/errResponse';
import { logout } from '../../redux/actions/auth.actions';
import { connect } from 'react-redux';

const schema = Yup.object().shape({
    oldpassword: Yup
        .string()
        .required("Please enter your password")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    newpassword: Yup
        .string()
        .required("Please enter your password")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    newpassword_confirmation: Yup
        .string()
        .required("Please confirm your password")
        .when("newpassword", {
            is: newpassword => (newpassword && newpassword.length > 0 ? true : false),
            then: Yup.string().oneOf([Yup.ref("newpassword")], "Password doesn't match")
    })
});

class UpdatePassword extends Component{
    constructor(props){
        super(props);
        this.state={
            submitsuccessfull   :   false,
            redirect    :   "",
            errResponse :   "",
            successResponse :   ""
        }
    }

    logout= ()=>{
        const { logout } = this.props;
        logout();
    };
    

    handleformsubmit=(values, {setSubmitting, resetForm}) => {
        setSubmitting(true);
        const baseUrl = process.env.REACT_APP_Server_baseUrl;
        const targeturl =   baseUrl +'/api/auth/password_change/';
        const config    ={
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        console.log(values);
        axios
            .post(targeturl,values,config)
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

                setTimeout(() => {
                    this.logout();
                }, 500);


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
                else if(err.response.status ===400){
                    const {logout}  =   this.props;
                    logout();
                }

            });
    }


    render(){
        return(
            <div
                className="container authcontainer"
            >
                <h2 style={{textAlign:'center'}}>Update Password</h2>
                <div className="err_response" style={{color :   'red'}}>{this.state.errResponse}</div>
                <div className="successResponse " style={{color :   'green'}}>{this.state.successResponse}</div>
                <br/>
                <Formik
                    validationSchema    =   {schema}
                    initialValues   =   {{
                        oldpassword :   '',
                        newpassword :   '',
                        newpassword_confirmation   :   ''
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
                                            <Form.Group as={Row} className="mb-3" controlId="PasswordChangeOldPassword">
                                                <Form.Label column sm={2}>
                                                    Old Password
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control   
                                                        type    =   "password"
                                                        placeholder =   "Enter Old Password"
                                                        name    =   "oldpassword"
                                                        value   =   {props.values.oldpassword}
                                                        onChange    =   {props.handleChange}
                                                        isInvalid   =   {!!props.errors.oldpassword}
                                                    />
                                                </Col>
                                                <Form.Control.Feedback type="invalid">Password must contain at least 8 characters, one uppercase, one number and one special case character</Form.Control.Feedback>
                                            </Form.Group>
                    
                                            <Form.Group as={Row} className="mb-3" controlId="PasswordChangeNewPassword">
                                                <Form.Label column sm={2}>
                                                    New Password
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control   
                                                        type    =   "password"
                                                        placeholder =   "Enter New Password"
                                                        name    =   "newpassword"
                                                        value   =   {props.values.newpassword}
                                                        onChange    =   {props.handleChange}
                                                        isInvalid   =   {!!props.errors.newpassword}
                                                    />
                                                    <Form.Control.Feedback type="invalid">Password must contain at least 8 characters, one uppercase, one number and one special case character</Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>
                    
                    
                                            <Form.Group as={Row} className="mb-3" controlId="PasswordChangePasswordConfirmation">
                                                <Form.Label column sm={2}>
                                                    Confirm  New Password
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control   
                                                        type    =   "password"
                                                        placeholder =   "Enter re-enter new Password"
                                                        name    =   "newpassword_confirmation"
                                                        value   =   {props.values.newpassword_confirmation}
                                                        onChange    =   {props.handleChange}
                                                        isInvalid   =   {!!props.errors.newpassword_confirmation}
                                                    />
                                                    <Form.Control.Feedback>{props.errors.newpassword_confirmation}</Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>
                                        <Button variant="primary"   type="submit" disabled={props.isSubmitting}>Update My Password</Button>
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

const mapDispatchToProps = dispatch => ({
    logout: () => {
      dispatch(logout());
    },
});
  

export default connect(null,mapDispatchToProps)(UpdatePassword);