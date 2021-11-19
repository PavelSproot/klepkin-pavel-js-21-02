import React, {ReactNode} from "react";
import "./Footer.css"

export class Footer extends React.Component<any, any> {
    render () : ReactNode {
        return (
            <div className="footer">
                <nav className="fccont"><a href="" className="menuref">Контакты</a></nav>
                <div className="crcont">&#169; 2021 ИП Рыбов О.А.</div>
            </div>
        );
    }
}