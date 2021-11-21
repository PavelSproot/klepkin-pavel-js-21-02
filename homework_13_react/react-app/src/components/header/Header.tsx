import React, {ReactNode} from "react";
import "./Header.css"

export class Header extends React.Component<any, any> {
    render () : ReactNode {
        return (
        <div className="header">
            <h1 className="headerCaption">Интернет-магазин "Не только красивое"</h1>
        </div>
        );
    }
}