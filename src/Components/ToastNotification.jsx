import React,{Component} from "react";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Pusher from 'pusher-js';
import { connect } from "react-redux";
class ToastNotification extends Component{
    constructor(props){
        super(props);
        this.state ={
            ToastShow : false,
            ToastContent : "",
            ToastNotifications  :   []
        }
    }
    componentDidMount(){    
        const pusher = new Pusher(process.env.REACT_APP_Pusher_Key, {
          cluster: "ap2",
        });
    
        const myChannel = pusher.subscribe("taskstatusupdatechannel");
        myChannel.bind("taskstatusupdate", (data) => {
            if (data.id === this.props.loggedInUser.id) {
                this.setState({
                    ToastShow :   true,
                    ToastContent    :   data.message
                })
            }
        });
    
        const channel = pusher.subscribe("taskassignedchannel");
        channel.bind("taskassignedevent", (data) => {
          if (data.id === this.props.loggedInUser.id) {
            this.setState({
                ToastShow :   true,
                ToastContent    :   data.message
            })
          }
        });
    }
    closeToast=()=>{
        this.setState({
            ToastShow   :   !this.state.ToastShow
        })
    }
    render(){
        return(
            <>
                <ToastContainer position="top-end" className="p-3" style={{zIndex:"20"}}>
                    <Toast show={this.state.ToastShow} onClose={this.closeToast}>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Notification</strong>
                            <small className="text-muted">just now</small>
                        </Toast.Header>
                        <Toast.Body>{this.state.ToastContent}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        loggedInUser: state.auth.loggedInUser,
    }
}


export default connect(mapStateToProps)(ToastNotification);