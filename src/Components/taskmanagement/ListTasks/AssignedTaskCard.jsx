import React, { Component } from "react";
import {Modal} from 'react-bootstrap';
import { MdEdit, MdDelete } from "react-icons/md";
import axios from "axios";
import { editTask, deleteTask } from "../../../redux/actions/tasks.actions";
import { connect } from "react-redux";
import {  logout  } from "../../../redux/actions/auth.actions";
// import EditTaskForm
import EditTaskForm from "../EditTask/edittaskform";

class AssignedTaskCard extends Component {
  state = {
    modalShow   :   false,
    errResponse :   "",
    successResponse :   ""
  };
  handleModal =()=>{
    this.setState({
        modalShow:!this.state.modalShow
    })
  }
  handleformsubmit=(values, {setSubmitting, resetForm}) => {
    console.log(values);
    setSubmitting(true);
    setTimeout(() => {
      resetForm();
      setSubmitting(false);
    }, 100);

    const baseUrl = process.env.REACT_APP_Server_baseUrl;
    const targeturl =   baseUrl +'/api/tasks/update/';
    const user = {
        task_id : values.task_id,
        title :  values.title,
        description:    values.description,
        dueDate :   values.dueDate
    };
    const config    ={
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
  
    axios
      .put(targeturl,user,config)
      .then((res)=>{
          console.log(res);
          this.setState({
              errResponse    :   "",
              successResponse    :   res.data['message']  
          });
          setTimeout(() => {
            this.setState({
              modalShow:!this.state.modalShow,
              successResponse : "",
          });
          }, 100);
      })
      .catch((err)=>{
          if(err.response.status  === 400){
              this.setState({
                  successResponse : '',
                  errResponse :"Please logout and login again because your session token is expired",
              });
              const {logout}  = this.props;
              logout();
          }
          else if(err.response.status  === 401){
              this.setState({
                  successResponse : '',
                  errResponse :  err.response.data.error,
              });
          }
      });
  }

  deleteHandler = () => {
    axios
      .delete(`http://localhost:8000/api/tasks/delete/${this.props.task.id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        this.props.deleteTask(this.props.task.id);
      }).catch((err)=>{
        if(err.response.status  === 400){
          const {logout}  = this.props;
          logout();
        }
      });
  };
  render() {
    const dueDate = this.props.task.dueDate;
    const newdueDate =new Date(dueDate);
    const today = new Date();
    const overduecondition =  newdueDate.getTime()>today.getTime()
    let subDate = this.props.task.dueDate.slice(0, 16);
    subDate = subDate.replace(" ",'T');
    return (
      <div
        style={{
          backgroundColor: "rgb(245,245,245)",
          padding: "10px",
          fontSize: "14px",
          marginTop: "20px",
          borderRadius: "5px",
          boxShadow: "1px 1px 5px 0px rgba(0,0,0,0.55)",
        }}
      >
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
                  Edit  Task
              </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{padding:"30px"}}>
              <div style={{color:"red"}} className="err_response">{this.state.errResponse}</div>
              <div style={{color:"green"}} className="successResponse">{this.state.successResponse}</div>
              <EditTaskForm 
                initialValues={{
                  task_id : this.props.task.id,
                  title:this.props.task.title,
                  description:this.props.task.description,
                  dueDate:subDate
                }} 
                handleSubmit={this.handleformsubmit}
              />
          </Modal.Body>
        </Modal>
        <div className="editDelete" onClick={this.deleteHandler}>
          <MdDelete color="rgb(164, 40, 44)" size="20px" />
        </div>
        {!this.state.editable && this.props.task.status !== "completed" ? (
          <div
            className="editDelete"
            onClick={this.handleModal}
          >
            <MdEdit color="rgb(54, 40, 124)" size="20px" />
          </div>
        ) : null}
        {!overduecondition && this.props.task.status !== "completed" ? (
          <p className="overdueDate">
            {dueDate}
          </p>
        ) : (
          <p className="notoverdueDate">
            {dueDate}
          </p>
        )}
        <b>{this.props.task.title}</b>
        <p>{this.props.task.description}</p>
        <p style={{ float: "right" }}>
          Status : <i>{this.props.task.status}</i>
        </p>
        <i>Assigned to : </i>
        <a href={"/profile/users/user/"+this.props.task.assignee}>{this.props.task.assigneename}</a>
      </div>
    );
  }
}

export default connect(null, { editTask, deleteTask,  logout })(AssignedTaskCard);
