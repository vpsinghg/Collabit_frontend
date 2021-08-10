import {Formik} from 'formik';
import * as Yup from 'yup';
import { Row,Col,Form,Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Component } from 'react';

const schema = Yup.object().shape({
  title: Yup.string()
    .max(255, 'Must be 255 characters or less')
    .required('Required'),
  description: Yup.string().required(),
  dueDate: Yup.date().required(),
  // terms: Yup.bool().required().oneOf([true], 'Terms must be accepted'),
});

export class EditTaskForm extends Component{
    constructor(props){
        super(props);
        this.state ={
        }
    }
    render(){
        const {handleSubmit} =this.props;
        const {initialValues} =this.props;
        return (
        <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={initialValues}
        >
            {({
            handleSubmit,
            handleChange,
            values,
            isSubmitting,
            errors,
            }) => (
            <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="titlefortaskedit">
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
                <Form.Group as={Col} md="12" controlId="taskdescriptionedit">
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
                <Form.Group as={Col} md="6" controlId="dueDateedit">
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
                </Row>
                <Button type="submit" style={{marginTop:"2rem"}} disabled={isSubmitting}>Submit form</Button>
            </Form>
            )}
        </Formik>
        );
  
    }
}

const mapStateToProps = (state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
      loggedInUser: state.auth.loggedInUser
    }
}



export default connect(mapStateToProps)(EditTaskForm);