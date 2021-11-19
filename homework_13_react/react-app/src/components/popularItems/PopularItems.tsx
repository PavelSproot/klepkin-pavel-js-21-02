import React, {ReactNode} from "react";
import "./PopularItems.css"
import {PopularItemsElement} from "./PopularItemsElement";

export class PopularItems extends React.Component<any, any> {
    fishes: string[] = ["Палтус", "Сёмга", "Сом", "Мойва", "Сельдь", "Тунец"];
    render () : ReactNode {
        return (
            <div className="popular-items">
                <div className="popular-items__name"><h3>Популярные</h3></div>
                <div className="popular-items__cards">
                    {this.fishes.map((elem: string, index: number) =>  <PopularItemsElement name={elem} key={index} />)}
                </div>
            </div>
        );
    }
}