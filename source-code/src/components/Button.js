import React from 'react';

const Button = ({children, block = false, buttonProps = {}, color, size = "casual"}) => {

    const setClassNames = () => {
        let classes = "";
        if(block){
            classes += "cryo-btn-block ";
        }

        if(color) {
            classes += `cryo-btn-${color} `
        }

        classes += `cryo-btn-${size} `;

        if(buttonProps.className){
            classes += `${buttonProps.className} `
        }

        return classes;
    }

    const classNames = setClassNames();

    return (
        <div className="cryo-group">
            <button type="submit" className={`cryo-btn ${classNames}`}>{children}</button>
        </div>
    )
}

export default Button;