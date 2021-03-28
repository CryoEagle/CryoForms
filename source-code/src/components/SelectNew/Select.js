import React, { useRef, useState } from 'react';
import SelectContext from './SelectContext';
import Group from '../HOC/Group';

const Select = ({disallowFormGroup, label, rules = [], title = '', children, multiSelect, maxHeight = 300}) => {
    const optionsTitleRef = useRef(null);

    const [optionsOpened, setOptionsOpened] = useState(false);
    const [valuesSelected, setValuesSelected] = useState([]);

    const openOptions = () => {
        setOptionsOpened(!optionsOpened);
    }

    const setValues = (value) => {
        if(valuesSelected.includes(value)){
            setValuesSelected(valuesSelected.filter((item) => { return item != value }));
            return;
        }

        if(!multiSelect) {
            setValuesSelected([value]);
        } else {
            setValuesSelected([...valuesSelected, value]);
        }
    }

    const removeValue = (value) => {
        setValuesSelected(valuesSelected.filter((item) => { return item != value }));
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
                
                {optionsOpened && (
                    <div className='cryo-select-options'>
                        <SelectContext.Provider value={{selectedValues: valuesSelected, setValueHandler: setValues, removeValueHandler: removeValue}}>
                            <div className='cryo-select-options-wrap' style={{maxHeight: maxHeight}}>
                                {children}
                            </div>
                        </SelectContext.Provider>
                    </div>
                )}
            </div>
        </Group>
    )
}

export default Select;