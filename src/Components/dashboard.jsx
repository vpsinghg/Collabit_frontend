import React,{Component} from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import BreadcrumbComponent from './Breadcrumb';
import {Row, Col } from 'react-bootstrap';
import axios from 'axios';
// import MyTodoTasks
import MyTodoTasks from './MyTodoTasks/index';
// import MyPerformanceComponent
import MyPerformanceComponent from './MyPerformance/myperformance';
// import AssignedTaskBarGraph
import AssignedTaskBarGraph from './DashBoard/assignedtaskbargraph';

import { logout } from '../redux/actions/auth.actions';
export class UserDashboard extends Component{

    state   =   {
        myTododata  :   [],
        task_count : 0,
        createdTaskData :   [],
        allTaskData :   [],
    }

    componentDidMount(){
        const baseUrl = process.env.REACT_APP_Server_baseUrl;
        const targeturl =   baseUrl +'/api/tasks/performancedata/mytaskdata';
        const config    ={
            headers : { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params  : {
                profile_id  :   this.props.auth.loggedInUser.id
            }
        };
        axios
            .get(targeturl,config)
            .then((res)=>{
                console.log(res.data);
                this.setState({
                    myTododata  :   res.data.data,
                    task_count  :   res.data.task_count
                });
            })
            .catch((err)=>{
                console.log(err);
                if(err.response.status===400){
                    const {logout}  =   this.props;
                    logout();
                }
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
            height:"15.6em",
            maxHeight :"16em",
            overflowY: 'auto',
            backgroundColor:"white",
            borderRadius    :   "10px",
            boxShadow   :   "0px 0px 4px -3px rgba(0,0,0,0.9)",
            padding :"15px",
            marginTop:"1rem",
        }
        const bargraphparentstyle={
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
                    <div style={{marginLeft:0}}>
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
                                    <MyPerformanceComponent task_count={this.state.task_count}  data={this.state['myTododata']}/>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{}}>
                            <Col  sm={12}>
                                <strong>Assigned task Analysis</strong>
                                <div style={bargraphparentstyle}>
                                    <AssignedTaskBarGraph/>
                                </div>
                            </Col>
                        </Row>

                    </div>                
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
const mapDispatchToProps = dispatch => ({
    logout: () => {
      dispatch(logout());
    },
});

export default connect(mapStatetoProps,mapDispatchToProps)(UserDashboard);