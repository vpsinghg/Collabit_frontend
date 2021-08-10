import React,{Component} from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import BreadcrumbComponent from './Breadcrumb';
import {Col,Row } from 'react-bootstrap';
import UserProfileInfo from './UserProfileInfo';
// import MyPerformanceComponent
import MyPerformanceComponent from './MyPerformance/myperformance';
// import AssignedTaskBarGraph
import UserProfileBarGraph from './UserProfileBarGraph';
import axios from 'axios';
import { logout } from '../redux/actions/auth.actions';

export class UserprofileDashBoard extends Component{
    constructor(props){
        super(props);
        this.state ={
            task_count  :   0, 
            taskperformancedata :   []
        }
    }
    componentDidMount(){
        const profile_id    =   this.props.data.params.id;
        const baseUrl = process.env.REACT_APP_Server_baseUrl;
        const targeturl =   baseUrl +'/api/tasks/performancedata/mytaskdata';
        const data ={
            profile_id  :   profile_id,
        }
        const config    ={
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params :data
        };
        axios
            .get(targeturl,config)
            .then((res)=>{
                this.setState({
                    taskperformancedata  :   res.data.data,
                    task_count  :   res.data.task_count
                });
            })
            .catch((err)=>{
                console.log(err);
                if(err.response.status){
                    const {logout}  =   this.props;
                    logout();
                }
            })

    }
    render(){
        console.log(this.props);
        const routesList = [
            {
                url : '/profile',
                name :'DashBoard'
            },
            {
                url : '/profile/users',
                name : 'User Management'
            },
            {
                url :this.props.data.url,
                name : "User Info" 
            }
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
                                <strong>User Profile</strong>
                                <div style={todaystaskstyle}>
                                    <UserProfileInfo profile_id={this.props.data.params.id} />
                                </div>
                            </Col>
                            <Col style={{}} sm={6}>
                                <strong>User Performance</strong>
                                <div style={todaystaskstyle}>
                                    <MyPerformanceComponent task_count={this.state['task_count']} data={this.state['taskperformancedata']}/>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{}}>
                            <Col  sm={12}>
                                <strong>Assigned task Analysis</strong>
                                <div style={bargraphparentstyle}>
                                    <UserProfileBarGraph profile_id={this.props.data.params.id}/>
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

export default connect(mapStatetoProps,mapDispatchToProps)(UserprofileDashBoard);