import {Formik} from 'formik';
import * as Yup from 'yup';
import { Row,Col,Form,Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Component } from 'react';

const schema = Yup.object().shape({
  name: Yup.string()
    .max(15, 'Must be 20 characters or less')
    .required('Required'),
  email: Yup.string().required(),
  role: Yup.string().required(),
  // terms: Yup.bool().required().oneOf([true], 'Terms must be accepted'),
});

export class CreateUserForm extends Component{
  componentDidMount(){
  }
  render(){
    const {handleSubmit} =this.props;
    return (
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          name: '',
          email: '',
          role: 'normal',
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
              <Form.Group as={Col} md="12" controlId="fullnameforuser">
                <Form.Label>Full Name </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid" >Invalid  Name</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="taskdescription">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
            <Form.Group as={Col}  md={12}   controlId="Role">
                <Form.Label>Role</Form.Label>
                    <Form.Control
                        as="select"
                        onChange={handleChange}
                        value   =   {values.role}
                        name    =   'role'
                    >
                        <option value="normal">Normal</option>
                        <option value="admin">Admin</option>
                    </Form.Control>
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



export default connect(mapStateToProps)(CreateUserForm);