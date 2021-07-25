import React,{Component} from "react";
import SideBar from "./sidebar";
import AdminDashboard from "./admindashboard";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
export class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state ={
            activetab : "home",
        }
        this.tabtoggle =    this.tabtoggle.bind(this);
    }
    tabtoggle =(activetab)=>{
        console.log(activetab);
        this.setState({
            activetab:activetab
        });
        console.log(this.state.activetab);
    }

    
    render(){
        return(
            <div >
                <SideBar tabtoggle={this.tabtoggle} toggle={this.props.toggle} isOpen={this.props.isOpen} />
                <AdminDashboard activetab={this.state.activetab} isOpen={this.props.isOpen} />
            </div>
        )
    }
}

export default Dashboard;