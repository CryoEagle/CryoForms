import React, { useState, useRef } from 'react';
import Group from './HOC/Group';
import uuid from 'react-uuid';

const Switch = ({defaultValue = false, onColor = '#ff5722', label, name = '', onChange = () => {}, disallowFormGroup = false}) => {
    const [isOn, setIsOn] = useState(defaultValue ? defaultValue : false);
    const labelRef = useRef(null);

    const change = e => {
        if(!isOn){
            labelRef.current.setAttribute('data-old-color', labelRef.current.style.background);
            labelRef.current.style.background = onColor;
        } else {
            labelRef.current.style.background = labelRef.current.getAttribute('data-old-color');
        }

        setIsOn(!isOn);
        onChange(!isOn);
    }

    const id = uuid();

    return (
        <Group disallowFormGroup={disallowFormGroup}>
            <div className='cryo-flex'>
                <input
                    checked={isOn}
                    className='cryo-switch-checkbox cryo-control'
                    id={id}
                    type='checkbox'
                    onChange={change}
                    name={name}
                />
                <label
                    ref={labelRef}
                    className='cryo-switch-label'
                    htmlFor={id}
                >
                    <span className={`cryo-switch-button`} />
                </label>
                <div className='cryo-switch-description-wrapper'>
                    <span className='cryo-switch-description'>{label}</span>
                </div>
            </div>
        </Group>
    )
}

export default Switch;