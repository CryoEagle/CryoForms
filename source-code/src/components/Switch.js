import React, { useState, useRef } from 'react';

const Switch = ({defaultValue, onColor = '#ff5722', label, name}) => {
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
    }

    return (
        <div className="cryo-group">
            <div className="cryo-flex">
                <input
                    checked={isOn}
                    className="cryo-switch-checkbox cryo-control"
                    id={`cryo-switch-new`}
                    type="checkbox"
                    onChange={change}
                    name={name}
                />
                <label
                    ref={labelRef}
                    className="cryo-switch-label"
                    htmlFor={`cryo-switch-new`}
                >
                    <span className={`cryo-switch-button`} />
                </label>
                <div className="cryo-switch-description-wrapper">
                    <span className="cryo-switch-description">{label}</span>
                </div>
            </div>
        </div>
    )
}

export default Switch;