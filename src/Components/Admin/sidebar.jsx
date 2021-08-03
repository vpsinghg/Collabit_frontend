import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import {connect} from 'react-redux';
import { sidebarstatus } from "../../redux/actions/ui.actions";
class SideBar extends React.Component {
  handleClick = (e ) =>{
    this.props.tabtoggle(e.target.id);
  }

  togglesidebar = (e) =>{
    console.log(this.props);
    const {sidebarstatus} = this.props;
    const newstate = ! this.props.isOpen;
    sidebarstatus(newstate);
  }
  render() {
    return (
      <div className={classNames("sidebar", { "is-open": this.props.isOpen })}>
        <div className="sidebar-header">
          <Button
            variant="link"
            onClick={this.togglesidebar}
            style={{ color: "#dc3545" }}
            className="mt-4"
          >
            <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
          </Button>
          <h3>Welcome, {this.props.loggedInUser.name}</h3>
        </div>
        <hr/>
        <Nav className="flex-column pt-2">
          <Nav.Item >
            <Nav.Link id="home" className="active" href="/" >
              Dashboard
            </Nav.Link>
          </Nav.Item>
          { this.props.loggedInUser.role ==="admin" &&
          <Nav.Item >
            <Nav.Link id="user" href="/profile/users">
              User Management
            </Nav.Link>
          </Nav.Item>
          } 
          <Nav.Item >
            <Nav.Link id="task" href="/profile/tasks">
              Task Managements
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      isLoggedIn: state.auth.isLoggedIn,
      loggedInUser: state.auth.loggedInUser,
      isOpen  :   state.ui.sidebarstatusopen,
  }
}


const mapDispatchToProps = dispatch => ({
  sidebarstatus :(newstatus)   =>{
      dispatch(sidebarstatus(newstatus));
  }
});



export default connect(mapStateToProps,mapDispatchToProps)(SideBar);
