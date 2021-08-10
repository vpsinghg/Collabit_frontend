import React,{Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import CreateUserForm from "./createuserform";

import axios from 'axios';
import { connect } from 'react-redux';
import { logout } from '../../../redux/actions/auth.actions';
export class CreateUserModalComponent extends Component{
    state ={
        modalShow   :   false,
        errResponse :   "",
        successResponse :   ""
    }
    handleModal =()=>{
        this.setState({
            modalShow:!this.state.modalShow
        })
    }
    handleformsubmit=(values, {setSubmitting, resetForm}) => {

        setSubmitting(true);
        setTimeout(() => {
          resetForm();
          setSubmitting(false);
        }, 100);

        const baseUrl = process.env.REACT_APP_Server_baseUrl;
        const targeturl =   baseUrl +'/api/admin/users/create_user/';
        const user = {
            name:  values.name,
            email:    values.email,
            role:   values.role,
        };
        const config    ={
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
      
        axios
            .post(targeturl,user,config)
            .then((res)=>{
                this.setState({
                    errResponse    :   "",
                    successResponse    :   res.data['message']  
                });
                // this.setState({
                //     modalShow:!this.state.modalShow
                // });
            })
            .catch((err)=>{
                if(err.response.status  === 400){
                    this.setState({
                        errResponse :"Please logout and login again because your session token is expired",
                    });
                    const {logout}  =   this.props;
                    logout();
                    
                }
                if(err.response.status  === 401){
                    this.setState({
                        errResponse :  err.response.data.error,
                    });
                }
            });

      }

    render(){
        return(
            <>
                <Button
                    style={{
                        float   :   "right",
                        marginRight :   "1%",
                        letterSpacing   :   "1px",
                        paddging:"0px"
                    }}
                    size="sm"
                    onClick={this.handleModal}
                    >
                    Create User
                </Button>
                <Modal 
                    show={this.state.modalShow}
                    onHide={this.handleModal}
                    backdropClassName='static'
                    keyboard ={false}
                    size="lg"
                    aria-labelledby =   "contained-modal-title-vcenter"
                    centered
                    animation={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Create a User
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{padding:"30px"}}>
                        <div style={{color:"red"}} className="err_response">{this.state.errResponse}</div>
                        <div style={{color:"green"}} className="successResponse">{this.state.successResponse}</div>
                        <CreateUserForm handleSubmit={this.handleformsubmit}/>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        loggedInUser: state.auth.loggedInUser
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => {
      dispatch(logout());
    },
});


export default connect(mapStateToProps,mapDispatchToProps)(CreateUserModalComponent);