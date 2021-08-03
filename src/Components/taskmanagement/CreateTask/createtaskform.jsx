import {Formik} from 'formik';
import * as Yup from 'yup';
import { Row,Col,Form,Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Component } from 'react';

import axios from 'axios';

const schema = Yup.object().shape({
  title: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  description: Yup.string().required(),
  assignee: Yup.string().required(),
  // terms: Yup.bool().required().oneOf([true], 'Terms must be accepted'),
});

export class CreateTaskForm extends Component{
  constructor(props){
    super(props);
    this.state ={
      assigneeoptions :[]
    }
  }
  componentDidMount(){
    const baseUrl = process.env.REACT_APP_Server_baseUrl;
    const targeturl =   baseUrl +'/api/users/getuserslist/';
    const config    ={
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    axios
        .get(targeturl,config)
        .then((Response)=>{
            this.setState({
              assigneeoptions : Response.data.data
            });
            console.log(this.state.assigneeoptions);
        })
        .catch((err)=>{
            console.log(err);
        })
  }
  render(){
    const {handleSubmit} =this.props;
    return (
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          title: '',
          description: '',
          assignee: this.props.loggedInUser.id,
          dueDate: '',
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          isValid,
          isSubmitting,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="titlefortask">
                <Form.Label>Title </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid" >Invalid  Title</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="taskdescription">
                <Form.Label>Task Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Task Description"
                  name="description"
                  style={{ minHeight: '10rem' }}
                  value={values.description}
                  onChange={handleChange}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="6" controlId="dueDate">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder="Due Date"
                    name="dueDate"
                    value={values.dueDate}
                    onChange={handleChange}
                    isInvalid={!!errors.dueDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dueDate}
                  </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="assigneefortask">
                  <Form.Label>Assignee </Form.Label>
                  <Form.Control
                    as="select"
                    value   = {values.assignee}
                    onChange={handleChange}
                    name    =   'assignee'
                    isInvalid={!!errors.assignee}
                  >   
                    {
                      this.state.assigneeoptions.map((item,index)=>{
                        return(
                          <option key={index} value={item.id} >{this.props.loggedInUser.id ===item.id ?"Me":item.name +"(" +item.email +")"}</option>
                        )
                      })
                    }
                  </Form.Control>
                  <Form.Control.Feedback  type="invalid">Invalid assignee</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit" style={{marginTop:"2rem"}} disabled={isSubmitting}>Submit form</Button>
          </Form>
        )}
      </Formik>
    );
  
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
      isLoggedIn: state.auth.isLoggedIn,
      loggedInUser: state.auth.loggedInUser
  }
}



export default connect(mapStateToProps)(CreateTaskForm);