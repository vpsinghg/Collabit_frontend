import React, { Component } from "react";
import { connect } from "react-redux";
// import TaskTabs from "./TaskTabs";
import { Tab, Tabs } from "react-bootstrap";
import AssignedTasks from "./AssignedTasks";
import AllTasks from "./AllTasks";
import MyTasks from "./MyTasks.jsx";
class Tasks extends Component {
  state = {};

  componentDidMount() {

  }  
  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        <Tabs transition={false} defaultActiveKey="myTasks">
          <Tab eventKey="myTasks" title="My Tasks">
            <MyTasks type="myTasks" />
          </Tab>
          <Tab eventKey="assigned" title="Assigned Tasks">
            <AssignedTasks type="assigned" />
          </Tab>
          {this.props.auth.loggedInUser.role === "admin" ? (
            <Tab eventKey="all" title="All Tasks">
              <AllTasks type="all" />
            </Tab>
          ) : null}
        </Tabs>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  const { auth, tasks } = state;
  return { auth, tasks };
};

export default connect(mapStatetoProps)(Tasks);
