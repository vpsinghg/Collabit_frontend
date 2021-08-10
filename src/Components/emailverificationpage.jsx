import React,{Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { errorMessage } from '../utils/errResponse';
import {Nav,Button} from 'react-bootstrap';

class EmailVerificationMailPage extends Component{
    constructor(props){
        super(props);
        this.state={
            errResponse :   null,
            successResponse :   null
        }
    }
    componentDidMount(){
        const baseUrl = process.env.REACT_APP_Server_baseUrl;
        const token =   this.props.match.params.token;
        console.log(token);
        const targeturl =   baseUrl +'/api/auth/verify_email?email_verification_token='+token;
        axios
            .get(targeturl)
            .then((res)=>{
                console.log(res);
                this.setState({
                    successResponse :   res.data.message,
                    errorMessage    :   null
                })
            })
            .catch((err)=>{
                console.log(err);
                if(err.response.status  === 422){
                    this.setState({
                        errResponse :   errorMessage(err.response.data),
                        successResponse :   null
                    })
                }
                if(err.response.status  === 403){
                    this.setState({
                        errResponse :   err.response.data['message'],
                        successResponse :   null,
                    })
                }
            })
    }

    render(){
        return(
            this.props.isLoggedIn 
            ? <Redirect to="/profile"/>
            :
            <div
                className="container authcontainer"
            >
                <div className="err_response"   style={{color   :   'red'}}>{this.state.errResponse}</div>
                <div className="successResponse"    style={{color   :   'green'}}>{this.state.successResponse}</div>
                <br/>
                <div style={{textAlign:'center'}}>
                    {
                        this.state.successResponse &&
                        <Nav.Link href="/login" ><Button>Login Here</Button></Nav.Link>
                    }

                    {
                        this.state.errResponse &&
                        <Nav.Link href ="/resendaccountactivationmail"><Button>Resend Account Activation</Button></Nav.Link>
                    }
                </div>
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
  
  
  


export default connect(mapStateToProps)(EmailVerificationMailPage);