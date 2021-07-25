import React,{Component} from 'react';
import axios from 'axios';
import { Row,Form,Col ,Spinner,Button} from 'react-bootstrap';

class UpdatePassword extends Component{
    constructor(props){
        super(props);
        this.state={
            email   :   '',
            oldpassword   : '',
            newpassword    :    '',
            password_confirmation   :   '',
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
            this.setState({
                email   :   user.email,
            });
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
                const targeturl =   baseUrl +'/api/auth/password_change/';
                const config    ={
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                };

                const data = {
                    oldpassword    :   this.state.oldpassword,
                    newpassword :   this.state.newpassword,
                    password_confirmation    :   this.state.password_confirmation
                };
                axios
                    .post(targeturl,data,config)
                    .then((res)=>{
                        this.setState({
                            loading :   false,
                        });
                        console.log(res);
                        this.setState({
                            errResponse    :   "",
                            successResponse    :   res.data['message'] 
                        });
    
                    })
                    .catch((err)=>{
                        this.setState({
                            loading :   false,
                        });
                        if(err.response.status  === 422){
                            this.setState({
                                errResponse :   JSON.stringify(err.response.data)
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
            margin :"2rem"
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
                    <Form.Group as={Row} className="mb-3" controlId="PasswordChangeOldPassword">
                        <Form.Label column sm={2}>
                            Old Password
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control   
                                type    =   "password"
                                placeholder =   "Enter Old Password"
                                name    =   "oldpassword"
                                value   =   {this.state.oldpassword}
                                onChange    =   {this.handleChange}
                                required
                            />

                        </Col>
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
                                value   =   {this.state.newpassword}
                                onChange    =   {this.handleChange}
                                required
                            />

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
                        <Button style={submit_button_style} variant="primary"   type="submit">Update My Password</Button>
                      )
                    }

                </Form>
            </div>
        )
    }

}

export default UpdatePassword;