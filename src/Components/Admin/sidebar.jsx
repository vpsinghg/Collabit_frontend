import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";


import {connect} from 'react-redux';

class SideBar extends React.Component {
  constructor(props){
    super(props);
    this.handleClick =this.handleClick.bind(this);
  }
  handleClick = (e ) =>{
    this.props.tabtoggle(e.target.id);
  }
  render() {
    return (
      <div className={classNames("sidebar", { "is-open": this.props.isOpen })}>
        <div className="sidebar-header">
          <Button
            variant="link"
            onClick={this.props.toggle}
            style={{ color: "#fff" }}
            className="mt-4"
          >
            <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
          </Button>
          <h3>Welcome, {this.props.auth.LoggedInUser.name}</h3>
        </div>
        <hr/>
        <Nav className="flex-column pt-2">

          <Nav.Item >
            <Nav.Link id="home" className="active" onClick={this.handleClick} >
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item >
            <Nav.Link id="user" onClick={this.handleClick}>
              User Management
            </Nav.Link>
          </Nav.Item>

          <Nav.Item >
            <Nav.Link id="task" onClick={this.handleClick}>
              Task Managements
            </Nav.Link>
          </Nav.Item>

        </Nav>
      </div>
    );
  }
}

const mapStatetoProps = (state) =>{
  const {auth}    =   state;
  return {auth};
}


export default connect(mapStatetoProps)(SideBar);
