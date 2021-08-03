import React,{Component} from 'react';
import { connect } from 'react-redux';
import classNames from "classnames";

import BreadcrumbComponent from '../Breadcrumb';
import CreateTaskModalComponent from "./CreateTask/createtaskmodal";
import Tasks from "./ListTasks/index";
import {Row,Col,Tab,Tabs} from 'react-bootstrap';
import "./taskmanagement.css";
class TaskManagementDashboard extends Component{
    constructor(){
        super();
        this.state ={
            activetab:"list"
        }    
    }
    componentDidMount(){

    }
    handletabclick =    (e)=>{
        const targetid =    e.target.id;
        this.setState({
            activetab   :   targetid
        })
    }
    render(){
        const routesList = [
            {
                url : '/profile',
                name :'DashBoard'
            },
            {
                url:'/profile/tasks',
                name:'Task Management',
            },
        ]

        return(
            <div className={classNames("admindashboardmain", { "is-open": this.props.isOpen })}>
                <div style={{marginLeft:"2%"}}>
                    <Row>
                        <Col>
                            <BreadcrumbComponent routesList={routesList}/>
                        </Col>
                        <Col>
                            <CreateTaskModalComponent/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{span:12}} sm={{span:12}}>
                            <Tabs defaultActiveKey="list" className="mb-12" style={{display:"flex",flexDirection:"row",justifyContent:"space-around",flexFlow:"row nowrap",alignContent: "center"}}>
                                <Tab eventKey="list" title="List">
                                    <Tasks/>
                                </Tab>
                                <Tab eventKey="overview" title="Overview">
                                    <h1>Overview</h1>
                                </Tab>
                                <Tab  eventKey="archived" title="archived">
                                    <h1>Archived</h1>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
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


export default connect(mapStatetoProps)(TaskManagementDashboard);