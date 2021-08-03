import React,{Component} from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import BreadcrumbComponent from './Breadcrumb';
export class UserprofileDashBoard extends Component{
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
        return(
            <div className={classNames("admindashboardmain", { "is-open": this.props.isOpen })}>
                <div style={{marginLeft:"2%"}}>
                    <BreadcrumbComponent routesList={routesList}/>
                    <h2>Welcome to User Profile  page</h2>
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

export default connect(mapStatetoProps)(UserprofileDashBoard);