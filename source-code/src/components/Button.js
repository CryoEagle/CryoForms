import React from 'react';
import Group from './HOC/Group';

const Button = ({children, block = false, buttonProps = {}, color, size = 'casual', disallowFormGroup, onClick = () => {}}) => {

    const setClassNames = () => {
        let classes = '';
        if(block){
            classes += 'cryo-btn-block ';
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
        <Group disallowFormGroup={disallowFormGroup}>
            <button onClick={onClick} {...buttonProps} type='submit' className={`cryo-btn ${classNames}`}>{children}</button>
        </Group>
    )
}

export default Button;