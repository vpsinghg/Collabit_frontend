import axios from 'axios';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import TodoTaskItem from './todotaskitem/TodotaskItem';
import { logout } from '../../redux/actions/auth.actions';
export class MyTodoTasks extends Component{
    state ={
        todotaskslist   :[]
    }
    componentDidMount(){
        const baseUrl = process.env.REACT_APP_Server_baseUrl;
        const targeturl =   baseUrl +'/api/tasks/todotasks/today';
        const config    ={
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        };

        axios
            .get(targeturl,config)
            .then((res)=>{
                this.setState({
                    todotaskslist : res.data.tasks,
                })
            }).catch((err)=>{
                if(err.response.status  ===400){
                    const {logout}  =   this.props;
                    logout();
                }
                
            })
    }

    render(){
        return(
            <>
            {
                this.state.todotaskslist.length ===0 && 
                <p className="notasks">You don't have any tasks for today</p>
            }
            {
            this.state.todotaskslist.map((todotaskitem,index)=>{
                return(
                    <TodoTaskItem key={index} todotaskitem={todotaskitem}/>
                )
            })
            }
            </>
        )
    }
}

const mapStateToProps   =   (state)=>{
    return{
        auth :  state.auth
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => {
      dispatch(logout());
    },
});

export default connect(mapStateToProps,mapDispatchToProps)(MyTodoTasks);