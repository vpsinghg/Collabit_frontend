import React,{Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import CreateTaskForm from "../CreateTask/createtaskform";

import axios from 'axios';
import { connect } from 'react-redux';
export class CreateTaskModalComponent extends Component{
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
    handleformsubmit=(values, {setSubmitting, resetForm},props) => {
        console.log(values);
        console.log(props);
        setSubmitting(true);
        setTimeout(() => {
          resetForm();
          setSubmitting(false);
        }, 100);

        const baseUrl = process.env.REACT_APP_Server_baseUrl;
        const targeturl =   baseUrl +'/api/tasks/create/';
        const user = {
            title:  values.title,
            description:    values.description,
            assignee:   values.assignee,
            dueDate :   values.dueDate
        };
        const config    ={
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
      
        axios
            .post(targeturl,user,config)
            .then((res)=>{
                console.log(res);
                this.setState({
                    errResponse    :   "",
                    successResponse    :   res.data['message']  
                });
                // this.setState({
                //     modalShow:!this.state.modalShow
                // });
            })
            .catch((err)=>{
                console.log(err.response.status);
                if(err.response.status  === 400){
                    this.setState({
                        errResponse :"Please logout and login again because your session token is expired",
                    });
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
                    Create Task
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
                            Create a Task
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{padding:"30px"}}>
                        <div style={{color:"red"}} className="err_response">{this.state.errResponse}</div>
                        <div style={{color:"green"}} className="successResponse">{this.state.successResponse}</div>
                        <CreateTaskForm handleSubmit={this.handleformsubmit}/>
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


export default connect(mapStateToProps)(CreateTaskModalComponent);