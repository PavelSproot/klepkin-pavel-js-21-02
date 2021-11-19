import React, {ReactNode} from "react";
import "./CompanyDescription.css"

export class CompanyDesvription extends React.Component<any, any> {
    render () : ReactNode {
        return (
            <div className="descrcont">
                <h2>Рыбы на любой вкус</h2>
                <span>Мы продаём рыбов, а не только показываем!</span>
            </div>
        );
    }
}