import React, { useRef, useState, useEffect } from 'react';
import SelectContext from './SelectContext';
import PropTypes from 'prop-types';

/**
 * Option element, must be inside of CryoSelect. You can select multiple options and we have plan for some improvements.
 *
 * @component
 * @param {string} value Value of option
 * @param {component} children Children means component inside like this <CryoOption>...Children...</CryoOption>
 * @param {string} selectedBackgroundColor Background color when option is in state selected
 * @param {string} selectedColor Color of text when option is in selected state
 * @example
 * return (
 *   <CryoOption value="test" ><span>Test</span></CryoOption>
 * )
 */
const CryoOption = ({value, children, selectedBackgroundColor = '#e8572a', selectedColor = '#fff'}) => {

    const [valueState, setValueState] = useState(value);
    const [defaultCss, setDefaultCss] = useState({});

    const optionRef = useRef(null);

    const mouseEnter = () => {
        optionRef.current.style.backgroundColor = selectedBackgroundColor;
        optionRef.current.style.color = selectedColor;
    }

    const mouseLeave = (dataFromSelect) => {
        if(!dataFromSelect.selectedValues.find(obj => { return obj.value == valueState })) {
            optionRef.current.style.backgroundColor = defaultCss.backgroundColor;
            optionRef.current.style.color = defaultCss.color;
        }
    }

    const optionSelected = (dataFromSelect) => {
        dataFromSelect.setValueHandler(valueState, optionRef.current.textContent);

        if(dataFromSelect.selectedValues.find(obj => { return obj.value == valueState })) {
            setTimeout(() => {
                optionRef.current.style.color = defaultCss.color;
            });
        }
    }

    // if value empty, take value from children
    useEffect(() => {
        if(!value){
            setValueState(optionRef.current.textContent);
        }
    }, []);

    // save default css
    useEffect(() => {
        if(optionRef.current.style.color == ''){
            optionRef.current.style.color = 'rgba(0,0,0,.6)';
        }

        setDefaultCss({backgroundColor: optionRef.current.style.backgroundColor, color: optionRef.current.style.color});
    }, []);

    const selectedStyle = {
        backgroundColor: selectedBackgroundColor,
        color: selectedColor
    }

    return (
        <SelectContext.Consumer>
            {(contextData) => (
                <div data-value={value} style={contextData.selectedValues.find(obj => { return obj.value == valueState }) ? selectedStyle : {}} onMouseEnter={mouseEnter} onMouseLeave={() => mouseLeave(contextData)} ref={optionRef} className={`cryo-select-option`} onClick={() => optionSelected(contextData)}>{children}</div>
            )}
        </SelectContext.Consumer>
    )
}

CryoOption.propTypes = {
    value: PropTypes.any,
    selectedBackgroundColor: PropTypes.string,
    selectedColor: PropTypes.string
}

export default CryoOption;