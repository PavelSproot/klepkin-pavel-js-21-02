import React, {ReactNode} from "react";
import "./ReclamElement.css"

export class ReclamElement extends React.Component<any, any> {
    render () : ReactNode {
        return (
            <div className="reclam-list__block">
                <a href="">{this.props.linkText}</a><br/>
                <span>{this.props.description}</span>
            </div>
        );
    }
}