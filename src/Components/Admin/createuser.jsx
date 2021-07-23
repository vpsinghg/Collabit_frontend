import React,   {Component} from 'react';
import {Form,Button, Row,Col} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
// import {Redirect} from 'react-router-dom';
import axios from 'axios';

class CreateUser extends Component{
    constructor(props){
        super(props);
        this.state ={
            name    :   '',
            email   :   '',
            role    :   'normal',
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
                const targeturl =   baseUrl +'/api/admin/users/create_user/';
                const user = {
                    name: this.state.name,
                    email: this.state.email,
                    role: this.state.role,
                };
                const config    ={
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                };
              
                axios
                    .post(targeturl,user,config)
                    .then((res)=>{
                        this.setState({
                            loading :   false,
                            name    :   '',
                            email   :   '',
                            role    :   'normal'
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
                        console.log(err.response);
                        if(err.response.status  === 401){
                            this.setState({
                                errResponse :  err.response.data.error,
                            });
                        }
                    });
            });    
        }
    }




    render ()   {
        // if(this.state.redirect)
        //     return  <Redirect to={this.state.redirect} />;
        

        const container_style={
            maxWidth:"90%",
            backgroundColor:"white",
            borderRadius    :   "10px",
            boxShadow   :   "0px 0px 10px -2px rgba(0,0,0,0.55)",
            padding :   "30px",
            marginTop :"10vh"
        };
        

        const submit_button_style ={
            marginTop : "20px"
        }

        return(
            <div
                className="container"
                style={container_style}
            >
                <h2 style={{textAlign:'center'}}>Create   User</h2>
                <div className="err_response" style={{color :   'red'}}>{this.state.errResponse}</div>
                <div className="successResponse"    style={{color   :   'green'}}>{this.state.successResponse}</div>
                <br/>

                


                <Form
                    noValidate
                    validated   =   {this.state.validated}
                    onSubmit    =   {this.handleSubmit}
                >
                    <Form.Group as={Row} className="mb-3" controlId="CreateUserFullname">
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

                    <Form.Group as={Row} className="mb-3" controlId="CreateUserEmailID">
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
                    <Form.Group as={Row}    className="mb-3" controlId="Role">
                        <Form.Label column sm={2}>Role</Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                as="select"
                                onChange={this.handleChange}
                                value   =   {this.state.role}
                                name    =   'role'
                            >
                                <option value="normal">Normal</option>
                                <option value="admin">Admin</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    {
                    this.state.loading ?
                        (<Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>)   :
                      (
                        <Button style={submit_button_style} variant="primary"   type="submit">Create User</Button>
                      )
                    }

                </Form>
            </div>
    
        )    
    }
    
};

export default CreateUser;