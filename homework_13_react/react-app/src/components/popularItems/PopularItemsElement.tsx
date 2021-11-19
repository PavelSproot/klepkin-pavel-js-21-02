import React, {ReactNode} from "react";
import "./PopularItemsElement.css"

export class PopularItemsElement extends React.Component<any, any> {
    render () : ReactNode {
        return (
            <div className="popular-items__item-card popular-items__item-card_theme-dark">
                <div className="popular-items__pict">
                <div className="popular-items__itemdescr">
                    <div className="popular-items__itemname"><a href="">{this.props.name}</a></div>
                    <div className="popular-items__itembut"><a href="" className="popular-items__ref">Купить</a>
                    </div>
                </div>
            </div>
        );
    }
}