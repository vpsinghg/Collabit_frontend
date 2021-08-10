import React,{Component} from "react";
import { Col, Row,Button } from "react-bootstrap";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { connect } from "react-redux";
import {logout} from    '../redux/actions/auth.actions';

class UserProfileInfo  extends Component{
    constructor(props){
        super(props);
        this.state={
            userdata :{},
            redirect :"",
        }
    }
    deleteUser  =   ()=>{
        const id  =   this.props.profile_id;
        const baseUrl = process.env.REACT_APP_Server_baseUrl;
        const targeturl =   baseUrl +'/api/admin/users/delete_user/';
        const data  =   {
            user_id : id,
        }

        const config    ={
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params:data
        };
        axios
        .delete(targeturl,config)
        .then((res)=>{
            console.log(res);
            this.setState({
            'redirect'  :   '/profile',
            },function(){
                window.location.assign(this.state.redirect);
            });

        })
        .catch((err)=>{
            console.log(err);
            if(err.response.status  ===400){
                const {logout}  =   this.props;
                logout();
            }

        })


    }
    componentDidMount(){
        const baseUrl = process.env.REACT_APP_Server_baseUrl;
        const targeturl =   baseUrl +'/api/user/';
        const data ={
            id  :   this.props.profile_id,
        }
        const config    ={
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params :data
        };
        axios
            .get(targeturl,config)
            .then((res)=>{
                this.setState({
                    userdata  :   res.data.data,
                });
            })
            .catch((err)=>{
                if(err.response.status===400){
                    const {logout}  =   this.props;
                    logout();
                }
            })


    }
    render(){
        return(
            <>  
                <Row>
                    <Col xs={5} md={3}>
                        <CgProfile size="5em" color="#24292e" />
                    </Col>
                    <Col xs={7} md={9}>
                        <strong>{this.state.userdata.name}</strong>
                        <h6>Email : {this.state.userdata.email}</h6>
                        <h6>Role : {this.state.userdata.role}</h6>
                    </Col>
                </Row>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around",marginTop:"2em"}}>
                    {
                    this.props.loggedInUser.role==="admin" && this.state.userdata.role !=="admin" &&
                        <Button style={{width:"5em"}} variant="danger" onClick={this.deleteUser}>Delete</Button>
                    }
                </div>
            </>
        )
    }
}

const mapStatetoProps = (state) =>{
    const {auth}    =   state;
    return auth;
}

const mapDispatchToProps = dispatch => ({
    logout: () => {
      dispatch(logout());
    },
});

export default connect(mapStatetoProps,mapDispatchToProps)(UserProfileInfo);