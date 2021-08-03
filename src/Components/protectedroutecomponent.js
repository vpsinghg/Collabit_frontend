import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import SideBar from './Admin/sidebar';
class ProtectedRouteComponent extends Component{
    constructor(props){
        super(props);
        this.state ={
            accessAllowed : true,
        }
    }
    componentDidMount(){
        const {isLoggedIn,loggedInUser} =this.props;
        if(!isLoggedIn){
            this.setState({
                accessAllowed   :   false,
            })
        }
        else{
            const id    =   loggedInUser['id'];
            const baseUrl = process.env.REACT_APP_Server_baseUrl;
            const targeturl =   baseUrl +'/api/user/';
            const config    ={
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                params :{'id':id}
            };
    
            axios
            .get(targeturl,config)
            .catch((err)=>{
                console.log(err);
                if(err.response.status ===400){
                    localStorage.clear();
                    this.setState({
                        accessAllowed   :   false,
                    })
                }
            });
        
        }
    }

    render(){
        const Component = this.props.component;
        if(!this.state.accessAllowed){
            return <Redirect to="/" />
        }
        return(
            this.props.isLoggedIn 
            ? 
            <>
                <SideBar  isOpen={this.props.isOpen}/>
                <Component data ={this.props.computedMatch} />
            </>
            :(<Redirect to={{pathname:"/"}} />)
        );
    }      
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        loggedInUser: state.auth.loggedInUser,
        isOpen  :   state.ui.sidebarstatusopen,
    }
}

export default connect(mapStateToProps)(ProtectedRouteComponent);