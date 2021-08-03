import axios from 'axios';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import TodoTaskItem from './todotaskitem/TodotaskItem';
export class MyTodoTasks extends Component{
    state ={
        todotaskslist   :[]
    }
    componentDidMount(){
        const baseUrl = process.env.REACT_APP_Server_baseUrl;
        const targeturl =   baseUrl +'/api/tasks/todotasks/';
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
                console.log(err.response)
            })
    }

    render(){
        return(
            <>
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

export default connect(mapStateToProps)(MyTodoTasks);