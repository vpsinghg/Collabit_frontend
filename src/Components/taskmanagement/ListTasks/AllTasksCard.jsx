import React, { Component } from "react";

class AllTaskCard extends Component {
  state = {};
  render() {
    const dueDate = this.props.task.dueDate;
    const newdueDate =new Date(dueDate);
    const today = new Date();
    const overduecondition =  newdueDate.getTime()>today.getTime()
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
        {!overduecondition && this.props.task.status !== "completed" ? (
          <p  className="overdueDate">
            {dueDate} [OVERDUE]
          </p>
        ) : (
          <p  className="notoverdueDate">
            {dueDate}
          </p>
        )}
        <b>{this.props.task.title}</b>
        <p>{this.props.task.description}</p>
        <i style={{float:"right"}}>Assigned by :
          <a href={"/profile/users/user/"+this.props.task.user_id}>{this.props.task.creatorname}</a>
        </i>
        <i >Assigned to : 
          <a href={"/profile/users/user/"+this.props.task.assignee}>{this.props.task.assigneename}</a>
        </i>
      </div>
    );
  }
}

export default AllTaskCard;
