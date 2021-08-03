import React,{Component} from "react";
import { Chart } from "react-google-charts";
import "../MyPerformance/myperformance.css";

const taskStatus ={
    "todo"  :   "Todo",
    "inProgress": "In Progress",
    "completed" :   "Completed",
    "overdue"   :   "OverDue"
}

export class MyPerformanceComponent extends Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    render(){
        const {data}    =   this.props;
        let initialdata=[
            ["Task Status" ,"Task Count"]
        ]
        for(const key of Object.keys(data)){
            initialdata.push([taskStatus[key],data[key]])
        }
        return(
            <>
                <Chart
                    // width={'500px'}
                    height={'12em'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={initialdata}
                    options={{
                        title: 'My Daily Activities',
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </>
        )
    }
}

export default MyPerformanceComponent;