import React, {ReactNode} from "react";
import "./SideBarElement.css"

export class SideBarElement extends React.Component<any, any> {
    render () : ReactNode {
        return (
            <div><label><input type="checkbox" name={"cb"+this.props.idx} /> {this.props.name}</label></div>
        );
    }
}