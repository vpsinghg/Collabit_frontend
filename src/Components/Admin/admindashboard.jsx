import React,{Component} from 'react';
// create user
import CreateUser from '../Admin/createuser';
// list users
import UserTable from './UserTable';
// home dashboard
import Dashboard from './dashboard';
import { Row,Col } from 'react-bootstrap';

import { connect } from 'react-redux';

export class AdminDashboard extends Component{
    constructor(props){
        super(props);
        this.state ={
            hometab : true,
            usertab :false,
            activetab   : 'hometab',
        }
    }

    handleHome =    ()  =>{
        this.setState({
            hometab :   true,
            usertab :   false
        })
    }

    handleUser =    ()  =>{
        this.setState({
            hometab:false,
            usertab:true,
            activetab: 'usertab'
        })
    }


    componentDidMount(){
        if(this.state.activetab ==="hometab"){
            this.handleHome();
        }
        else if(this.state.activetab ==="usertab"){
            this.handleUser();
        }
    }

    render(){
        return(
            <div>
                {/* <h2>Welcome to admin page</h2>
                <CreateUser/>
                <UserTable/> */}
                <Row>
                    <Col>
                        <div className="sidenav">
                            <div className="sidebar-heading">
                                {this.props.auth.LoggedInUser.name}
                            </div>
                            <div className="list-group">
                                <div 
                                    className={this.state.hometab ? "list-item selected" : "list-item"}
                                    onClick={this.handleHome}
                                >
                                    Dashboard
                                </div>
                                <div 
                                    className={this.state.usertab ? "list-item selected" : "list-item"}
                                    onClick={this.handleUser}
                                >
                                    User Management
                                </div>

                            </div>
                        </div>
                    </Col>
                    <Col   xs={9} >
                        {this.state.hometab && <Dashboard/>}
                        {this.state.usertab && (<div><CreateUser/> <UserTable/></div>)}
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStatetoProps = (state) =>{
    const {auth}    =   state;
    return {auth};
}

export default connect(mapStatetoProps)(AdminDashboard);