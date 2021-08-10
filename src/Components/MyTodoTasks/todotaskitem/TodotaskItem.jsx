import React,{Component} from 'react';
import classNames from 'classnames';
import {Row,Col} from 'react-bootstrap'
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
                    <Row>
                        <Col xs={4}>
                            <p style={{color:"red",marginTop:"2rem"}}>{`Due at  ${moment(todotaskitem.dueDate).calendar()}`}</p>
                        </Col>
                        <Col xs={8}>
                            <p style={{color:"#666",}}>{todotaskitem.description}</p>
                            <Row>
                                <a href={"/profile/users/user/"+todotaskitem.user_id}
                                >
                                    {` : Assigned by ${todotaskitem.creatorname}`}
                                </a> 
                                <p style={{float:"right"}}>
                                    {`Created at  ${moment(todotaskitem.created_at).calendar()}`}
                                </p>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default TodoTaskItem;