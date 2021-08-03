import React, { Component } from "react";
import { connect } from "react-redux";
import {Row, Col } from "react-bootstrap";
import AllTaskCard from "./AllTasksCard";
import TaskFilter from "./TaskFilter";
import axios from "axios";
import { getTasks } from "../../../redux/actions/tasks.actions";
class AllTasks extends Component {
  componentDidMount(){
    axios
      .get("http://localhost:8000/api/tasks/all", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        this.props.getTasks({ tasks: res.data.tasks, case: "ALL" });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const tasks = this.props.alltasks;
    console.log(tasks);
    let todo = [...tasks.filter((task) => task.status === "assigned")];
    let inProgress = [...tasks.filter((task) => task.status === "in-progress")];
    let completed = [...tasks.filter((task) => task.status === "completed")];
    return (
      <div style={{ padding: "20px", backgroundColor: "white" }}>
        <TaskFilter type="all" />
        <div>
          <Row>
            <Col className="todotasks">
              <p className="taskstatustype">TODO</p>
              {todo.length ===0 && <p className="notasks" >None of Tasks in in Todo status</p>}
              {todo.map((task) => {
                return <AllTaskCard key={task.id} task={task} />;
              })}
            </Col>
            <Col className="inprogresstasks">
              <p className="taskstatustype">IN-PROGRESS</p>
              {inProgress.length ===0 && <p className="notasks">None of Tasks is in Progress</p>}
              {inProgress.map((task) => {
                return <AllTaskCard key={task.id} task={task} />;
              })}
            </Col>
            <Col className="completedtasks" >
              <p className="taskstatustype">COMPLETED</p>
              {completed.length ===0 && <p className="notasks"> None of Tasks is completed</p>}
              {completed.map((task) => {
                return <AllTaskCard key={task.id} task={task} />;
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
    alltasks :  state.tasks.all
  };
};

export default connect(mapStatetoProps,{getTasks})(AllTasks);
