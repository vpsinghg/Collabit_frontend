import React,{Component} from 'react';
import classNames from 'classnames';
import moment from 'moment';
import "../todotaskitem/todotaskitem.css";
moment.locale('en-in');
export class TodoTaskItem extends Component{
    render(){
        const {todotaskitem} =this.props;
        return(
            <div style={{display:'flex',flexDirection:'column'}}>
                <div style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between'}}>
                    <b style={{float:'left'}}>{todotaskitem.title}</b>
                    <span className={classNames("status", todotaskitem.status)} style={{float:'right'}}>{todotaskitem.status}</span>
                </div>
                <div>
                <p style={{color:"#666",}}>{todotaskitem.description}</p>
                <p style={{color:"#666",marginTop:"-1rem"}}>{` ---by ${todotaskitem.user_id}  at ${moment(todotaskitem.created_at).calendar()}`}</p> 
                </div>
            </div>
        )
    }
}
export default TodoTaskItem;