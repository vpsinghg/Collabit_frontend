import React,{Component} from "react";
import { Form } from "react-bootstrap";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import axios from "axios";
import { connect } from "react-redux";
import {logout} from "../../redux/actions/auth.actions";
export class AssignedTaskBarGraph extends Component{
    constructor(props){
        super(props);
        this.state={
            categories: [],
            series  :   [],
            assignee : 'all',
            assigneeoptions:[],
        }
    }

    logout  =   ()=>{
        const {logout}  =   this.props;
        logout();
    }

    getBarGraphdata =()=>{
        const baseUrl = process.env.REACT_APP_Server_baseUrl;
        const targeturl =   baseUrl +'/api/tasks/bargraphdata/createddata/';
        const data    =   {
            id  :   this.props.loggedInUser.id,
            assignee    :   this.state.assignee
        }
        const config    ={
            headers : { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params :data
        };
        axios
            .get(targeturl,config)
            .then((res)=>{
                console.log(res.data);
                this.setState({
                    categories  :   res.data['categories'],
                    series  :   res.data['series']
                })
            })
            .catch((err)=>{
                console.log(err);
                if(err.response.status === 400){
                    this.logout();
                }
            })
    }
    componentDidMount(){
        this.getBarGraphdata();
        const baseUrl = process.env.REACT_APP_Server_baseUrl;
        // bargraphdata
        // list of users to whom i  have assigned tasks
        const config    ={
            headers : { Authorization: `Bearer ${localStorage.getItem('token')}` },
        };

        axios   
            .get(baseUrl+'/api/tasks/assignees/?id='+this.props.loggedInUser.id,config).then((res)=>{
                console.log(res);
                this.setState({
                    assigneeoptions:res.data.data,
                })
            })
            .catch((err)=>{
                if(err.response.status===400){
                    this.logout();
                }
                console.log(err);
            })
    }
    

    handleChange    =   (e) =>  {
        console.log(e.target.value);
            this.setState({
            [e.target.name] :   e.target.value,
        },()=>{
            this.getBarGraphdata();
        });
    }

    options = {
    }

    render(){
        return(
            <>
                <div style={{marginBottom:"5em"}} >
                    <div 
                        style={{
                            display:"flex",
                            flexDirection:"row",
                            justifyContent:"space-between",
                            float:"right"
                        }}   
                    >   
                        <Form.Label style={{marginTop:"auto",marginRight:"1em"}}>Assignee</Form.Label>
                        <Form.Control
                            as="select"
                            name    =   'assignee'
                            onChange    =   {this.handleChange}
                            value   =   {this.state.assignee}

                        >
                            <option value="all">All</option>
                            {
                                this.state.assigneeoptions.map((item,index)=>{
                                    return(
                                        <option key={index} value={item.id} >{this.props.loggedInUser.id ===item.id ?"Me":item.name +"(" +item.email +")"}</option>
                                    )
                                })
                            }
                        </Form.Control>
                    </div>

                </div>
                {
                    this.state.series.length<1 &&
                    <h2 style={{fontWeight:"bold",textAlign:"center"}}>No Task Data</h2>
                }
                {
                    this.state.series.length >0 &&
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            chart: {
                                type: 'column'
                            },
                            
                            title: {
                            text: 'Task Analysis'
                            },
                            legend: {
                                align: 'right',
                                verticalAlign: 'middle',
                                layout: 'vertical'
                            },
                            
                            xAxis: {
                                categories: this.state.categories,
                                labels: {
                                    x: -10
                                }
                            },
                            
                            yAxis: {
                                allowDecimals: false,
                                title: {
                                text: 'Number of Tasks'
                                }
                            },
                            series:this.state.series,
                            responsive: {
                                rules: [{
                                    condition: {
                                        maxWidth: 500
                                    },
                                    chartOptions: {
                                        legend: {
                                        align: 'center',
                                        verticalAlign: 'bottom',
                                        layout: 'horizontal'
                                        },
                                        yAxis: {
                                            labels: {
                                                align: 'left',
                                                x: 0,
                                                y: -5
                                            },
                                            title: {
                                                text: null
                                            }
                                        },
                                        subtitle: {
                                            text: null
                                        },
                                        credits: {
                                            enabled: false
                                        }
                                    }
                                }]
                            }        
                            }
                        }
                    />

                }     
    
            </>
        )
    }
}

const mapStateToProps=(state)=>{
    const loggedInUser = state.auth;
    return loggedInUser;
}

const mapDispatchToProps = dispatch => ({
    logout: () => {
      dispatch(logout());
    },
});

export default connect(mapStateToProps,mapDispatchToProps)(AssignedTaskBarGraph);