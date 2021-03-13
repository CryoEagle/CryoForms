import React, { useRef, useState, useEffect } from 'react';
import SelectContext from './SelectContext';

const Option = ({children, value, selectedBackgroundColor = '#e8572a', selectedColor = '#fff', submitAsArray = false}) => {
    const [defaultCss, setDefaultCss] = useState({color: null, backgroundColor: null, selected: false});
    const optionRef = useRef(null);

    const optionSelected = (contextData) => {
        if(!defaultCss.selected) {
            const select = () => {
                // styling
                optionRef.current.style.backgroundColor = selectedBackgroundColor;
                optionRef.current.style.color = selectedColor;
                optionRef.current.classList.add('cryo-select-option-selected');

                // logic
                setDefaultCss({...defaultCss, selected: true});
                contextData.optionSelected(value, optionRef.current.textContent);
            }

            if(!contextData.multiSelect && contextData.optionsSelected.length < 1) { 
                select();
            } else if (contextData.multiSelect) {
                select();
            }
        } else {
            // styling
            optionRef.current.style.backgroundColor = defaultCss.backgroundColor;
            optionRef.current.style.color = defaultCss.color;
            setDefaultCss({...defaultCss, selected: false});
            optionRef.current.classList.remove('cryo-select-option-selected');

            // logic
            contextData.optionUnselected(value);
        }
    }

    const mouseEnter = () => {
        optionRef.current.style.backgroundColor = selectedBackgroundColor;
        optionRef.current.style.color = selectedColor;
    }

    const mouseLeave = () => {
        if(!defaultCss.selected) {
            optionRef.current.style.backgroundColor = defaultCss.backgroundColor;
            optionRef.current.style.color = defaultCss.color;
        }
    }

    useEffect(() => {
        if(optionRef.current.style.color == ''){
            optionRef.current.style.color = 'rgba(0,0,0,.6)';
        }

        setDefaultCss({backgroundColor: optionRef.current.style.backgroundColor, color: optionRef.current.style.color, selected: false});
    }, []);

    return (
        <SelectContext.Consumer>
            {(contextData) => (
                <div onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} ref={optionRef} className='cryo-select-option' onClick={() => optionSelected(contextData)}>{children}</div>
            )}
        </SelectContext.Consumer>
    )
}

export default Option;