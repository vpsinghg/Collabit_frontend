import React,{Component} from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import BreadcrumbComponent from './Breadcrumb';

import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
// import MyTodoTasks
import MyTodoTasks from './MyTodoTasks/index';
// import MyPerformanceComponent
import MyPerformanceComponent from './MyPerformance/myperformance';
export class UserDashboard extends Component{

    state   =   {
        myTododata  :   [],
        createdTaskData :   [],
        allTaskData :   [],
    }

    componentDidMount(){
        const baseUrl = process.env.REACT_APP_Server_baseUrl;
        const targeturl =   baseUrl +'/api/tasks/data/';
        const config    ={
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        };
        axios
            .get(targeturl,config)
            .then((res)=>{
                this.setState({
                    myTododata  :   res.data.myTodoData,
                    createdTaskData :   res.data.createdTaskData
                });
                if(this.props.auth.loggedInUser.role ==="admin"){
                    this.setState({
                        allTaskData :   res.data.allTaskData
                    });
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    render(){
        const routesList = [
            {
                url : '/',
                name :'Home'
            },

            {
                url : '/profile',
                name :'DashBoard'
            },
        ]
        const todaystaskstyle={
            height:"14rem",
            maxHeight :"14em",
            overflowY: 'auto',
            backgroundColor:"white",
            borderRadius    :   "10px",
            boxShadow   :   "0px 0px 4px -3px rgba(0,0,0,0.9)",
            padding :"15px",
            marginTop:"1rem",
        }
        return(
            <div className={classNames("admindashboardmain", { "is-open": this.props.isOpen })}>
                <div style={{marginLeft:"2%"}}>
                    <BreadcrumbComponent routesList={routesList}/>
                    <Container style={{marginLeft:0}}>
                        <Row style={{}}>
                            <Col style={{marginBottom:"1rem"}} sm={6}>
                                <strong>Today's Task</strong>
                                <div style={todaystaskstyle}>
                                    <MyTodoTasks/>
                                </div>
                            </Col>
                            <Col style={{}} sm={6}>
                                <strong>My Performance</strong>
                                <div style={todaystaskstyle}>
                                    <MyPerformanceComponent data={this.state['myTododata']}/>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{}}>
                            <Col style={{marginBottom:"1rem"}} sm={12}>
                                <strong>Today's Task</strong>
                                <div style={todaystaskstyle}>
                                    <MyTodoTasks/>
                                </div>
                            </Col>
                        </Row>

                    </Container>                
                </div>
            </div>
        )
    }
}
const mapStatetoProps = (state) =>{
    const {auth}    =   state;
    const isOpen =  state.ui.sidebarstatusopen
    return {auth,isOpen};
}

export default connect(mapStatetoProps)(UserDashboard);