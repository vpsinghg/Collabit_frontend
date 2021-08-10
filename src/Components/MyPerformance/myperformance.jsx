import React,{Component} from "react";
import { Chart } from "react-google-charts";
import "../MyPerformance/myperformance.css";


export class MyPerformanceComponent extends Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    render(){
        const data    =   this.props;
        const performancedata =data.data;
        const task_count    =   data.task_count;
        let initialdata=[
            ["Task Status" ,"Task Count"]
        ]
        if(task_count >0){
            for(const key of Object.keys(performancedata)){
                initialdata.push([key,performancedata[key]])
            }    
        }
        return(
            <>
                <Chart
                    height={'15.5em'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={initialdata}
                    options={{
                        title: 'Tasks Status',
                        slices: [
                            {
                                color: "#2BB673"
                            },
                            {
                                color: "#e9a227"
                            },
                            {
                                color: "#d91e48"
                            },
                            {
                                color: "#007fad"
                            },
                            {
                                color: '#696969'
                            }
                        ],
                        legend: {
                            position: "right",
                            alignment: "center",
                            textStyle: {
                              fontSize: 10
                            }
                        },   
                        tooltip: {
                            showColorCode: true
                        },
                                           
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </>
        )
    }
}

export default MyPerformanceComponent;