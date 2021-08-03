import { useState,useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { connect } from 'react-redux';
import { Row,Col ,Form} from 'react-bootstrap';
import { errorMessage } from '../../utils/errResponse';
export const UserTable = (props)=>{
    const [users, setUsers] = useState([]);
    const [namefilter, Setnamefilter] =   useState('');
    const [emailfilter, Setemailfilter] =   useState('');
    const [rolefilter, Setrolefilter] =   useState('all');
    const [verifiedfilter,Setverifiedfilter] =  useState('allusers')
    const [createdByfilter, SetcreatedByfilter] =   useState('all');
    const [errResponse, SeterrResponse] =useState("");
    const [successResponse, SetsuccessResponse] =useState("");
    const [datafectch,Setdatafetch] =useState(false);
    const [createdByoptions,Setcreatedbyoptions] =useState([]);

    useEffect(()=>{
        const baseUrl = process.env.REACT_APP_Server_baseUrl;
        const targeturl =   baseUrl +'/api/admin/users/filter/';
        const data  =   {
            name    :   namefilter,
            email   :   emailfilter,
            role    :   rolefilter,
            createdBy   :createdByfilter,
            verified : verifiedfilter
        }
        console.log(data);
        const config    ={
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params :data
        };
        axios
            .get(targeturl,config)
            .then((Response)=>{
                setUsers(Response.data.users);
            })
            .catch((err)=>{
                console.log(err);
            })
        
        }, [datafectch] // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(() => {
        const baseUrl   =   process.env.REACT_APP_Server_baseUrl;
        const targeturl =   baseUrl + '/api/admin/getadminusers/';
        const config    ={
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        };
        axios
        .get(targeturl,config)
        .then((Response)=>{
            console.log(Response.data.admins);
            Setcreatedbyoptions(Response.data.admins);
        })
        .catch((err)=>{
            console.log(err);
        })
     }, []);
     

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
                console.log(e.target.value);
                SetcreatedByfilter(e.target.value);
                break;
            }
            case 'verifieduser' :   {
                Setverifiedfilter(e.target.id);
                break;
            }
            default:{
                break;
            }
        }
        Setdatafetch(!datafectch);
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
        maxWidth:"90%",
        backgroundColor:"white",
        borderRadius    :   "10px",
        boxShadow   :   "0px 0px 10px -2px rgba(0,0,0,0.55)",
        padding : "2rem",
        marginTop:'2rem'
    }

    return(
        <div className="container"  
            style={container_style}
        >
            <h1>Users</h1>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="NameFilter">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="filter with name" onChange={handlechange} value={namefilter} name="namefilter"></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="EmailFilter">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="filter with email" onChange={handlechange} value={emailfilter} name="emailfilter"></Form.Control>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="RoleFilter">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                        as="select"
                        onChange={handlechange}
                        value   =   {rolefilter}
                        name    =   'rolefilter'
                    >   
                        <option value="all" >All</option>
                        <option value="normal">Normal</option>
                        <option value="admin">Admin</option>
                    </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="CreatedByFilter">
                    <Form.Label>createdBy</Form.Label>
                    <Form.Control
                        as="select"
                        value   = {createdByfilter}
                        onChange={handlechange}
                        name    =   'createdByfilter'
                    > 
                    <option value="all" >All</option>
                    {
                      createdByoptions.map((item,index)=>{
                        return(
                          <option key={index} value={item.id} >{props.loggedInUser.id ===item.id ?"Me":item.name +"(" +item.email +")"}</option>
                        )
                      })
                    }
                  </Form.Control>
                    </Form.Group>
                </Row>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label as="legend" column sm={4}>
                        User Verified filter
                    </Form.Label>
                    <Col sm={8} >
                        <Form.Check
                        type="radio"
                        label="All"
                        name="verifieduser"
                        id="allusers"
                        checked ={verifiedfilter ==="allusers"}
                        onChange={handlechange}
                        />

                        <Form.Check
                        type="radio"
                        label="verified"
                        name="verifieduser"
                        id="verifiedusers"
                        onChange={handlechange}
                        checked ={verifiedfilter ==='verifiedusers'}
                        />
                        <Form.Check
                        type="radio"
                        label="not-verified"
                        name="verifieduser"
                        id="notverifiedusers"
                        onChange ={handlechange}
                        checked ={verifiedfilter ==='notverifiedusers'}
                        />
                    </Col>
                </Form.Group>
            </Form>
            <div>
                <div className="errors">
                    <div style={{color:"red"}} className="err_response">{errResponse}</div>
                    <div style={{color:"green"}}className="successResponse " >{successResponse}</div>
                </div>
                <Table striped bordered hover  responsive size="sm" style={{marginTop:"20px"}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item, i) => (
                            <tr key={i}>
                                <td><a href={'/profile/users/user/' + item.id}>{item.name}</a></td>
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
const mapStateToProps=(state)=>{
    return{
        loggedInUser: state.auth.loggedInUser
    }
}

export default connect(mapStateToProps)(UserTable);