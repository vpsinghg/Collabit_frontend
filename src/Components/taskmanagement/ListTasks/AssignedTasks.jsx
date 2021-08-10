import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import AssignedTaskCard from "./AssignedTaskCard";
import TaskFilter from "./TaskFilter";
import { getTasks } from "../../../redux/actions/tasks.actions";
import {  logout  } from "../../../redux/actions/auth.actions";
class AssignedTasks extends Component {
  componentDidMount(){
  }

  render() {
    const tasks = this.props.taskscreated;
    let todo = [...tasks.filter((task) => task.status === "assigned")];
    let inProgress = [...tasks.filter((task) => task.status === "in-progress")];
    let completed = [...tasks.filter((task) => task.status === "completed")];
    return (
      <div style={{ padding: "20px", backgroundColor: "white" }}>
        <TaskFilter type="assigned" />
        <div>
          <Row>
            <Col className="todotasks" >
              <p className="taskstatustype">TODO</p>
              {todo.length ===0 && <p className="notasks" >None of your assigned task is in todo status</p>}
              {todo.map((task) => {
                return <AssignedTaskCard key={task.id} task={task} />;
              })}
            </Col>
            <Col className="inprogresstasks">
              <p className="taskstatustype">IN-PROGRESS</p>
              {inProgress.length ===0 && <p className="notasks">None of your assigned task is in Progress</p>}
              {inProgress.map((task) => {
                return <AssignedTaskCard key={task.id} task={task} />;
              })}
            </Col>
            <Col className="completedtasks" >
              <p className="taskstatustype">COMPLETED</p>
              {completed.length ===0 && <p className="notasks">None of your assigned task is completed</p>}
              {completed.map((task) => {
                return <AssignedTaskCard key={task.id} task={task} />;
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
    taskscreated :  state.tasks.assigned,
  }
};

export default connect(mapStatetoProps,{getTasks,logout})(AssignedTasks);
