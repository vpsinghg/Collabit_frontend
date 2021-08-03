import React, { Component } from "react";
import { connect } from "react-redux";
import {  Row, Col } from "react-bootstrap";
import MyTaskCard from "./MyTaskCard";
import TaskFilter from "./TaskFilter";
import { getTasks } from "../../../redux/actions/tasks.actions";

import axios from "axios";
class MyTasks extends Component {
  componentDidMount(){
    axios.get("http://localhost:8000/api/tasks/todotasks", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      console.log(res);
      this.props.getTasks({ tasks: res.data.tasks, case: "TODO" });
    })
    .catch((err) => {
      console.log(err);
    });
  }
  render() {
    console.log(this.props.mytodotasks);
    const tasks = this.props.mytodotasks;
    let todo = [...tasks.filter((task) => task.status === "assigned")];
    let inProgress = [...tasks.filter((task) => task.status === "in-progress")];
    let completed = [...tasks.filter((task) => task.status === "completed")];
    return (
      <div style={{ padding: "20px", backgroundColor: "white" }}>
        <TaskFilter type="todo" />
        <div>
          <Row>
            <Col className="todotasks">
              <p className="taskstatustype">TODO</p>
              {todo.length ===0 && <p className="notasks" >Your Todo Task list is empty</p>}
              {todo.map((task) => {
                return <MyTaskCard key={task.id} task={task} />;
              })}
            </Col>
            <Col className="inprogresstasks">
              <p className="taskstatustype">IN-PROGRESS</p>
              {inProgress.length ===0 && <p className="notasks">You don't have any In Progress Tasks</p>}
              {inProgress.map((task) => {
                return <MyTaskCard key={task.id} task={task} />;
              })}
            </Col>
            <Col className="completedtasks" >
              <p className="taskstatustype">COMPLETED</p>
              {completed.length ===0 && <p className="notasks">You don't have any completed Task</p>}
              {completed.map((task) => {
                return <MyTaskCard key={task.id} task={task} />;
              })}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    mytodotasks: state.tasks.todo,
  }
};

export default connect(mapStatetoProps,{getTasks})(MyTasks);
