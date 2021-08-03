import React,{Component} from 'react';
// list users
import UserTable from './UserTable';
import { connect } from 'react-redux';
import classNames from "classnames";
import BreadcrumbComponent from '../Breadcrumb';
import CreateUserModalComponent from "./createUser/createusermodal";
import { Col,Row } from 'react-bootstrap';
export class AdminDashboard extends Component{
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
            {
                url : '/profile/users',
                name : 'User Management'
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
                            <CreateUserModalComponent/>
                        </Col>
                    </Row>
                    <UserTable/>
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

export default connect(mapStatetoProps)(AdminDashboard);