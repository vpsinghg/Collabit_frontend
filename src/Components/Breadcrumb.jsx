import React from "react";
import { Breadcrumb } from "react-bootstrap";

export class BreadcrumbComponent extends React.Component {
    render() {
        const {routesList} =this.props;
        return (
            <Breadcrumb>
                {routesList.map((item,index)=>{
                    return <Breadcrumb.Item key={index} href={item.url} active={index === (routesList.length-1)} >{item.name}</Breadcrumb.Item>
                })}
            </Breadcrumb>    
        );
    }
}

export default BreadcrumbComponent;