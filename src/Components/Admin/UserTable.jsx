import { useState,useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

import { Row,Col,Card } from 'react-bootstrap';
import { errorMessage } from '../../utils/errResponse';
export const UserTable = (props)=>{
    const [users, setUsers] = useState([]);
    const [namefilter, Setnamefilter] =   useState('');
    const [emailfilter, Setemailfilter] =   useState('');
    const [rolefilter, Setrolefilter] =   useState('');
    const [createdByfilter, SetcreatedByfilter] =   useState('');
    const [errResponse, SeterrResponse] =useState("");
    const [successResponse, SetsuccessResponse] =useState("");
    const [datafectch,Setdatafetch] =useState(false);

    useEffect(()=>{
        const baseUrl = process.env.REACT_APP_Server_baseUrl;
        const targeturl =   baseUrl +'/api/admin/users/filter/';
        const data  =   {
            name    :   namefilter,
            email   :   emailfilter,
            role    :   rolefilter,
            createdBy   :parseInt(createdByfilter)
        }

        const config    ={
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params :data
        };
        axios
            .get(targeturl,config)
            .then((Response)=>{
                setUsers(Response.data.users);
                Setdatafetch(false);
            })
            .catch((err)=>{
                console.log(err);
            })
        
    },[datafectch]);
    const handlechange    =(e)=>{
        
        switch(e.target.name){
            case 'namefilter':{
                Setnamefilter(e.target.value);
                break;
            }
            case 'emailfilter':{
                Setemailfilter(e.target.value);
                break;
            }
            case 'rolefilter'   :{
                Setrolefilter(e.target.value);
                break;
            }
            case 'createdByfilter'  :{
                SetcreatedByfilter(e.target.value);
                break;
            }
            default:{
                break;
            }
        }
        Setdatafetch(true);
    }

    const deleteUser =(id)    =>{
        console.log(id);
        const baseUrl = process.env.REACT_APP_Server_baseUrl;
        const targeturl =   baseUrl +'/api/admin/users/delete_user/';
        const data  =   {
            user_id : id,
        }

        const config    ={
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params:data
        };
        console.log(config);
        axios
        .delete(targeturl,config)
        .then((res)=>{
            SetsuccessResponse(res.data['message']);
            Setdatafetch(!datafectch);
        })
        .catch((err)=>{
            console.log(err);
            if(err.response.status  === 422){
                SeterrResponse(errorMessage(err.response.data))
            }
            else{
                SeterrResponse(err.response.data['message']);
            }

        })

    }

    const container_style={
        maxWidth:"80%",
    }

    return(
        <div className="container"  style={container_style}
        >
            <h1>User listing</h1>
            <Card style={{display:'flex',flexDirection:"row",justifyContent:"space-around"}}>
                <Row>
                    <Col>
                    <input type="text" placeholder="filter with name" onChange={handlechange} value={namefilter} name="namefilter"></input>
                    </Col>
                    <Col>
                    <input type="text" placeholder="filter with email" onChange={handlechange} value={emailfilter} name="emailfilter"></input>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input type="text" placeholder="filter with role" onChange={handlechange} value ={rolefilter} name="rolefilter"></input>
                    </Col>
                    <Col>   
                        <input type="text" placeholder="filter with createdBy" onChange={handlechange} value={createdByfilter} name="createdByfilter"></input>
                    </Col>
                </Row>
            </Card>
            <div>
                <div className="errors">
                    <div style={{color:"red"}} className="err_response" style={{color :   'red'}}>{errResponse}</div>
                    <div style={{color:"green"}}className="successResponse " style={{color :   'green'}}>{successResponse}</div>
                </div>
                <Table striped bordered hover  responsive size="sm" style={{marginTop:"20px"}}>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item, i) => (
                            <tr key={i}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td onClick={deleteUser.bind(this,item.id)}>delete</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )

}

export default UserTable;