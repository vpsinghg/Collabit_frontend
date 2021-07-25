import React,{Component} from 'react';
// create user
import CreateUser from '../Admin/createuser';
// list users
import UserTable from './UserTable';
// home dashboard
import Dashboard from './dashboard';
import { Row,Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import classNames from "classnames";

export class AdminDashboard extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className={classNames("admindashboardmain", { "is-open": this.props.isOpen })}>
            {console.log(this.props.activetab)}
                {this.props.activetab ==="home" && <Dashboard/>}
                {this.props.activetab ==="user" && (<div><CreateUser/> <UserTable/></div>)}
            </div>
        )
    }
}

const mapStatetoProps = (state) =>{
    const {auth}    =   state;
    return {auth};
}

export default connect(mapStatetoProps)(AdminDashboard);