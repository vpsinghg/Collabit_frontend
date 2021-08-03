import React, { Component } from "react";

class AllTaskCard extends Component {
  state = {};
  render() {
    const dueDate = this.props.task.dueDate;
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + " " + time;
    const subDate = this.props.task.dueDate.slice(0, 16);
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
        {dateTime > dueDate && this.props.task.status !== "completed" ? (
          <p  className="overdueDate">
            {subDate} [OVERDUE]
          </p>
        ) : (
          <p  className="notoverdueDate">
            {subDate}
          </p>
        )}
        <b>{this.props.task.title}</b>
        <p>{this.props.task.description}</p>
        <p style={{ float: "right" }}>
          Assigned to: {this.props.task.assignee}
        </p>
        <p>Assigned by: {this.props.task.user_id}</p>
      </div>
    );
  }
}

export default AllTaskCard;
