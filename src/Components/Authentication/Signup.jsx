import React,   {Component} from 'react';
import {Form,Button, Row,Col,Nav,Spinner} from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

// utils errResponse
import { errorMessage } from '../../utils/errResponse';

class Signup extends Component{
    constructor(props){
        super(props);
        this.state ={
            name    :   '',
            email   :   '',
            password    :   '',
            password_confirmation   :   '',
            validated   :   false,
            loading :   false,
            redirect    :   "",
            errResponse :   "",
            successResponse :   ""
        }
    }

    componentDidMount(){
    }

    handleChange    =   (e) =>  {
        this.setState({
            [e.target.name] :   e.target.value
        });
    }

    handleSubmit    =   (e) =>  {
        e.preventDefault();
        const   form    =   e.currentTarget;
        if(form.checkValidity()===false){
            e.preventDefault();
            e.stopPropagation();
        }

        this.setState({
            validated   :   true,
        });
        if(form.checkValidity() === true){
            this.setState({ loading :  true},  ()  =>{
                const baseUrl = process.env.REACT_APP_Server_baseUrl;
                const targeturl =   baseUrl +'/api/auth/register/';
                const user = {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                    password_confirmation: this.state.password_confirmation
                  };
              
                axios
                    .post(targeturl,user)
                    .then((res)=>{
                        this.setState({
                            loading :   false,
                        });
                        console.log(res);
                        this.setState({
                            errResponse    :   "",
                            name    :   '',
                            email   :   '',
                            password    :   '',
                            password_confirmation   :   '',
                            successResponse    :   res.data.message 
                        });
    
                    })
                    .catch((err)=>{
                        this.setState({
                            loading :   false,
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




    render ()   {
        const conatiner_style={
            maxWidth:"60%",
            backgroundColor:"white",
            borderRadius    :   "10px",
            boxShadow   :   "0px 0px 10px -2px rgba(0,0,0,0.55)",
            padding :   "2rem",
        };
        

        const submit_button_style ={
            marginTop : "20px"
        }

        return(
            this.props.isLoggedIn 
            ? <Redirect to="/profile"/>
            :
            <div
                className="container"
                style={conatiner_style}
            >
                <h2 style={{textAlign:'center'}}>Sign Up</h2>
                <div style={{color:'red'}} className="err_response">{this.state.errResponse}</div>
                <div style={{color:'green'}} className="successResponse">{this.state.successResponse}</div>
                <br/>

                <Form
                    noValidate
                    validated   =   {this.state.validated}
                    onSubmit    =   {this.handleSubmit}
                >
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalFullname">
                        <Form.Label column sm={2}>
                            FullName
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control   
                                type    =   "text"
                                placeholder =   "Enter your Full Name"
                                name    =   "name"
                                onChange    =   {this.handleChange}
                                value   =   {this.state.name}

                                required
                            />
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
                                value   =   {this.state.email}
                                onChange    =   {this.handleChange}
                                required
                            />

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
                                value   =   {this.state.password}
                                onChange    =   {this.handleChange}
                                required
                            />
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
                                value   =   {this.state.password_confirmation}
                                onChange    =   {this.handleChange}
                                required
                            />
                        </Col>
                    </Form.Group>

                    {
                    this.state.loading ?
                        (<Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>)   :
                      (
                        <Button style={submit_button_style} variant="primary"   type="submit">Submit</Button>
                      )
                    }

                </Form>
                <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
                    <a href="/login" >Login here</a>
                </div>
                <Nav.Link href ="/resendaccountactivationmail">Resend Account Activation</Nav.Link>


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