import React, { Component } from "react";
import { getTasks } from "../../../redux/actions/tasks.actions";
import { Form, Row, Col ,Container} from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";

class TaskFilter extends Component {
  state = {
    keyword: "",
    assignee: "all",
    assignor: "all",
    startTime: "",
    endTime: "",
    assigneeoptions:  [],
    assignoroptions : [],
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidMount(){
    if(this.props.type==="todo"){
      this.setState({
        assignee : this.props.loggedInUser.id,
        assignor : 'all'
      });
    }
    else if(this.props.type ==="assigned"){
      this.setState({
        assignor :  this.props.loggedInUser.id,
        assignee  : 'all',
      });
    }
    const baseUrl = process.env.REACT_APP_Server_baseUrl;
    const targeturl =   baseUrl +'/api/users/getuserslist/';
    const config    ={
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    axios
        .get(targeturl,config)
        .then((Response)=>{
            this.setState({
              assigneeoptions : Response.data.data,
              assignoroptions : Response.data.data
            });
        })
        .catch((err)=>{
            console.log(err);
        })
  }
  componentDidUpdate() {
    let data = {
      keyword: this.state.keyword === "" ? undefined : this.state.keyword,
      assignee: this.state.assignee === "" ? undefined : this.state.assignee,
      assignor: this.state.assignor === "" ? undefined : this.state.assignor,
      startTime: this.state.startTime === "" ? undefined : this.state.startTime,
      endTime: this.state.endTime === "" ? undefined : this.state.endTime,
    };
    console.log(data);
    axios
      .post(
        `http://localhost:8000/api/tasks/filter/${this.props.type}/${this.props.loggedInUser.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (this.props.type === "all"){
          this.props.getTasks({ tasks: res.data.tasks, case: "ALL" });
        }
        else  if (this.props.type === "assigned"){
          this.props.getTasks({ tasks: res.data.tasks, case: "ASSIGNED" });
        }
        else  if (this.props.type === "todo"){
          this.props.getTasks({ tasks: res.data.tasks, case: "TODO" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const tasksfilter_style={
      backgroundColor:"white",
      borderRadius    :   "10px",
      boxShadow   :   "0px 0px 10px -2px rgba(0,0,0,0.55)",
      padding : "2rem",
      marginTop:'2rem',
      marginBottom: '2rem'
    }
  
    return (
      <Container style={tasksfilter_style}>
      <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId={this.props.type+"KeywordFilter"}>
              <Form.Label>Keyword</Form.Label>
              <Form.Control
                name="keyword"
                type="text"
                placeholder="Enter keyword"
                value={this.state.keyword}
                onChange={this.onChange}
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group as={Col} controlId={this.props.type+"Assignor"}>
              <Form.Label>Assignor</Form.Label>
              <Form.Control
                as="select"
                name="assignor"
                type="text"
                placeholder="Assignor"
                value   = {this.state.assignor}
                onChange={this.onChange}
              > 
                {
                  this.props.type !=="assigned" &&
                  <>
                    <option value="all">All</option>
                    {
                      this.state.assignoroptions.map((item,index)=>{
                        return(
                          <option key={index} value={item.id} >{this.props.loggedInUser.id ===item.id ?"Me":item.name +"(" +item.email +")"}</option>
                        )
                      })
                    }
                  </>
                }
                {     
                this.props.type ==="assigned" && <option  value={this.props.loggedInUser.id}>Me</option>
                } 
              </Form.Control>

            </Form.Group>

            <Form.Group as={Col} controlId={this.props.type+"Assignee"}>
              <Form.Label>Assignee</Form.Label>
              <Form.Control
                as="select"
                name="assignee"
                type="text"
                placeholder="Assignee"
                value   = {this.state.assignee}
                onChange={this.onChange}
              > 
                {
                  this.props.type !=="todo" &&
                  <>
                    <option value="all">All</option> 
                    {
                      this.state.assigneeoptions.map((item,index)=>{
                        return(
                          <option key={index} value={item.id} >{this.props.loggedInUser.id ===item.id ?"Me":item.name +"(" +item.email +")"}</option>
                        )
                      })
                    }
                  </>
                }
                {
                
                  this.props.type ==="todo" && <option  value={this.props.loggedInUser.id}>Me</option>
                }
              </Form.Control>
            </Form.Group>

          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label >
                Start:
              </Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="startTime"
                  value={this.state.startTime}
                  onChange={this.onChange}
                  required
                />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label >
                End:
              </Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="endTime"
                  value={this.state.endTime}
                  onChange={this.onChange}
                  required
                />
            </Form.Group>
          </Row>
        </Form>
        </Container>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
      loggedInUser: state.auth.loggedInUser
  };
};

export default connect(mapStatetoProps, { getTasks })(TaskFilter);
