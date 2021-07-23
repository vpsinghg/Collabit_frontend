import React,{Component} from 'react';
import axios from 'axios';
import { Row,Form,Col ,Spinner,Button} from 'react-bootstrap';

import { errorMessage } from '../../utils/errResponse';

class ForgotPasswordChange extends Component{
    constructor(props){
        super(props);
        this.state={
            password   : '',
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
                const token =   this.props.match.params.token;
                const targeturl =   baseUrl +'/api/auth/forget_password_update/?' +'token='+token;
                console.log(targeturl);
                const data = {
                    password    :   this.state.password,
                    password_confirmation    :   this.state.password_confirmation
                };
                axios
                    .post(targeturl,data)
                    .then((res)=>{
                        this.setState({
                            loading :   false,
                        });
                        console.log(res);
                        this.setState({
                            errResponse    :   "",
                            password    :   '',
                            password_confirmation   :   '',
                            successResponse    :   res.data['message'] 
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
                        if(err.response.status  === 403){
                            this.setState({
                                errResponse :   err.response.data['message']
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
            padding :   "30px",
            marginTop :"10vh"
        };
        const submit_button_style ={
            marginTop : "20px"
        };


        return(
            <div
                className="container"
                style={conatiner_style}
            >
                <h2 style={{textAlign:'center'}}>Update Password</h2>
                <div className="err_response" style={{color :   'red'}}>{this.state.errResponse}</div>
                <div className="successResponse " style={{color :   'green'}}>{this.state.successResponse}</div>
                <br/>
                <Form
                    noValidate
                    validated   =   {this.state.validated} 
                    onSubmit    =   {this.handleSubmit}
                >
                    <Form.Group as={Row} className="mb-3" controlId="ForgotPasswordChangePassword">
                        <Form.Label column sm={2}>
                            Password
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control   
                                type    =   "password"
                                placeholder =   "Enter Password"
                                name    =   "password"
                                value   =   {this.state.password}
                                onChange    =   {this.handleChange}
                                required
                            />

                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="ForgotPasswordChangePasswordConfirmation">
                        <Form.Label column sm={2}>
                            Confirm Password
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control   
                                type    =   "password"
                                placeholder =   "Enter re-enter your Password"
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
                        <span className="visually-show">Loading...</span>
                      </Spinner>)   :
                      (
                        <Button style={submit_button_style} variant="primary"   type="submit">Update My Password</Button>
                      )
                    }

                </Form>
            </div>
        )
    }

}

export default ForgotPasswordChange;