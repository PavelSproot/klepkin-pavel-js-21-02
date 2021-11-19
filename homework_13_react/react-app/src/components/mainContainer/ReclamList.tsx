import React, {ReactNode} from "react";
import "./ReclamList.css"
import {ReclamElement} from "./ReclamElement";

export class ReclamList extends React.Component<any, any> {
    render () : ReactNode {
        return (
            <div className="reclam-list">
                <ReclamElement
                    linkText="Замороженные рыбы"
                    description="Мы заморозили рыбов для вас"
                />
                <ReclamElement
                    linkText="Живые рыбы"
                    description="На кухню или на разведение"
                />
            </div>
        );
    }
}