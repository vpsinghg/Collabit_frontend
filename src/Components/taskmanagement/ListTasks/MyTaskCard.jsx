import React, { Component } from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import axios from "axios";
import { updateStatus } from "../../../redux/actions/tasks.actions";
import {logout} from "../../../redux/actions/auth.actions";

class MyTaskCard extends Component {
  state = {
    value: this.props.task.status,
  };

  handleStatus = (e) => {
    if (e.target.value !== this.state.value) {
      this.setState({ value: e.target.value });
      const baseUrl = process.env.REACT_APP_Server_baseUrl;
      const targeturl =   baseUrl +'/api/tasks/update/status/';
      const config    ={
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      axios.post(
        targeturl,
        {
          status: e.target.value,
          task_id : this.props.task.id
        },
        config
        )
        .then((res) => {
          this.props.updateStatus({
            id: this.props.task.id,
            status: this.state.value,
          });
        })
        .catch((err) => {
          if(err.response.status  ===400){
            const {logout}  = this.props;
            logout();
          }
          console.log(err);
        });
    }
  };
  render() {
    const dueDate = this.props.task.dueDate;
    const newdueDate =new Date(dueDate);
    const today = new Date();
    const overduecondition =  newdueDate.getTime()>today.getTime()
    return (
      <div
        style={{
          backgroundColor: "rgb(248,248,248)",
          padding: "10px",
          fontSize: "14px",
          marginTop: "20px",
          borderRadius: "5px",
          boxShadow: "1px 1px 5px 0px rgba(0,0,0,0.55)",
        }}
      >
        {!overduecondition && this.props.task.status !== "completed" ? (
          <p className="overdueDate">
            {dueDate} [OVERDUE]
          </p>
        ) : (
          <p style={{ color: "rgb(136, 136, 159)", fontSize: "18px" }}>
            {dueDate}
          </p>
        )}
        <b>{this.props.task.title}</b>
        <p>{this.props.task.description}</p>
        <Form.Control
          as="select"
          value={this.state.value}
          onChange={this.handleStatus}
        >
          <option value="assigned">Assigned</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
        </Form.Control>
        <br />
        <br />
        <i>Assigned by : </i>
        <a href={"/profile/users/user/"+this.props.task.user_id}>{this.props.task.creatorname}</a>
      </div>
    );
  }
}

export default connect(null, { updateStatus ,logout})(MyTaskCard);
