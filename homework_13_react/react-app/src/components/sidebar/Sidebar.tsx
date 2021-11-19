import React, {ReactNode} from "react";
import "./Sidebar.css"
import {SideBarElement} from "./SideBarElement";

export class Sidebar extends React.Component<any, any> {
    elements = [
        {
            name: "Морская рыба",
            items: ["Акула", "Окунь", "Палтус", "Треска"]
        },
        {
            name: "Пресноводная рыба",
            items: ["Белоглазка", "Осётр", "Речной угорь", "Налим"]
        }
    ];
    render () : ReactNode {
        return (
            <div className="sidebar">
                {this.elements.map((elem, idx) => {
                    return (
                        <div key={idx}>
                            <h4>{elem.name}</h4>
                            <div className="fish-menu__fish">
                                {elem.items.map((item: String, index: number) => <SideBarElement name={item} idx={index} key={index}/>)}
                            </div>
                        </div>
                    );})
                }
            </div>
        );
    }
}