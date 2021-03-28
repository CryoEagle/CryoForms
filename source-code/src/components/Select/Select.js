import React, { useRef, useState } from 'react';
import SelectContext from './SelectContext';
import Group from '../HOC/Group';

const Select = ({label = '', rules = [], children, multiSelect = false, title = '', maxHeight = '300px', disallowFormGroup}) => {

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedRef, setSelectedRef] = useState(null);

    const setArrayToTitle = (newSelectedOptions) => {
        let textForTitleReplace = '';

        newSelectedOptions.forEach((item, index) => {
            textForTitleReplace += item.textContent;
            if(index < newSelectedOptions.length - 1) {
                textForTitleReplace += ', ';
            }
        });

        optionsTitleRef.current.textContent = textForTitleReplace;
    }

    const optionSelected = (value, htmlTextContent) => {
        let newSelectedOptions = [...selectedOptions, {value: value, textContent: htmlTextContent}];
        setSelectedOptions([newSelectedOptions]);

        if(!multiSelect) {
            optionsTitleRef.current.textContent = htmlTextContent;
        } else {
            setArrayToTitle(newSelectedOptions);
        }
    }

    const optionUnselected = (value) => {
        let newSelectedOptions = selectedOptions.filter((item) => { return item.value != value });
        setSelectedOptions(newSelectedOptions);

        if(!multiSelect) {
            optionsTitleRef.current.textContent = title;
        } else {
            if(newSelectedOptions != 0) {
                setArrayToTitle(newSelectedOptions);
            } else {
                optionsTitleRef.current.textContent = title;
            }
        }
    }
    
    const optionsRef = useRef(null);
    const optionsTitleRef = useRef(null);

    const openOptions = () => {
        if(optionsRef.current.style.display == 'none' || optionsRef.current.style.display == '') {
            optionsRef.current.style.display = 'block';
            optionsRef.current.style.opacity = '1';
        } else {
            optionsRef.current.style.display = 'none';
            optionsRef.current.style.opacity = '0';
        }
    }

    return (
        <Group disallowFormGroup={disallowFormGroup}>
            <div style={{position: 'relative'}}>
                {label && (
                    <div>
                        <span className='cryo-label-global'><label>{label}</label> {rules.some(() => item => item.required == true) && <span>*</span>}</span>
                    </div>
                )}

                <button ref={optionsTitleRef} className='cryo-select' type='button' onClick={openOptions}>{title}</button>
                <div className='cryo-select-options' ref={optionsRef}>
                    <SelectContext.Provider value={{optionSelected: optionSelected, optionUnselected: optionUnselected, multiSelect: multiSelect, optionsSelected: selectedOptions, getSelectedRef: selectedRef, setSelectedRef: setSelectedRef}}>
                        <div className='cryo-select-options-wrap' style={{maxHeight: maxHeight}}>
                            {children}
                        </div>
                    </SelectContext.Provider>
                </div>
            </div>
        </Group>
    )
}

export default Select;