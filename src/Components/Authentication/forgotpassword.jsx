import React,{Component} from 'react';
import axios from 'axios';
import { Row,Form,Col ,Spinner,Button} from 'react-bootstrap';

import { errorMessage } from '../../utils/errResponse';

class ForgotPassword extends Component{
    constructor(props){
        super(props);
        this.state={
            email   : '',
            validated   :   false,
            loading :   false,
            redirect    :   "",
            errResponse :   "",
            successResponse :   ""
        }
    }

    componentDidMount(){
        if(localStorage.getItem('token'))   {
            const user  =   JSON.parse(localStorage.getItem("user"));
            if(user.role    === 'admin'){
                this.setState({
                    redirect    :   "/admin",
                });
            }
            else{
                this.setState({
                    redirect    :   "/user"
                });
            }
        }
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
                const targeturl =   baseUrl +'/api/auth/forget_password/';
                const user = {
                    email: this.state.email,
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
                            successResponse    :   res.data['message'],
                            email   :'',
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
                                errResponse :   err.response.data.message
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
                <h2 style={{textAlign:'center'}}>Request Password change Mail</h2>
                <div style={{color:"red"}} className="err_response">{this.state.errResponse}</div>
                <div style={{color:"green"}} className="successResponse">{this.state.successResponse}</div>
                <br/>
                <Form
                    noValidate
                    validated   =   {this.state.validated} 
                    onSubmit    =   {this.handleSubmit}
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
                                value   =   {this.state.email}
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
                        <Button style={submit_button_style} variant="primary"   type="submit">Send me Mail for Password Update</Button>
                      )
                    }

                </Form>
            </div>
        )
    }

}

export default ForgotPassword;