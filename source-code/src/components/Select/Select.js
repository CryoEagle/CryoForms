import React, { useRef, useState, useEffect } from 'react';
import SelectContext from './SelectContext';
import Group from '../HOC/Group';

const Select = ({disallowFormGroup, label, rules = [], title = '', children, multiSelect, maxHeight = 300, onChange = () => {}, errorMessProps = {}, name, onNotValidChange = () => {}, value = []}) => {
    const optionsTitleRef = useRef(null);
    const errorMessRef = useRef(null);
    const inputRef = useRef(null);
    const parentOfChildrenRef = useRef(null);
    const optionsRef = useRef(null);

    const [optionsOpened, setOptionsOpened] = useState(false);
    const [valuesSelected, setValuesSelected] = useState([]);
    const [usableValue, setUsableValue] = useState('');
    const [realValue, setRealValue] = useState('');
    const [valueAlreadyChanged, setValueAlreadyChanged] = useState(false);

    const openOptions = () => {
        let opened = !optionsOpened;

        if(opened == true) {
            optionsRef.current.style.display = 'block';
        } else {
            optionsRef.current.style.display = 'none';
        }
        setValueAlreadyChanged(true);
        setOptionsOpened(opened);
    }

    const setValues = (value, title) => {
        if(valuesSelected.find(obj => { return obj.value == value })){
            setValuesSelected(valuesSelected.filter((item) => { return item.value != value }));
            return;
        }

        if(!multiSelect) {
            setValuesSelected([{value: value, title: title}]);
        } else {
            setValuesSelected([...valuesSelected, {value: value, title: title}]);
        }
    }

    const removeValue = (value) => {
        setValuesSelected(valuesSelected.filter((item) => { return item.value != value }));
    }

    const checkRules = () => {
        const ruleRequired = (inputEl, errorEl, mess) => {
            if(inputEl.value == ''){
                inputEl.setAttribute('error', mess);
                errorEl.style.display = 'block';
                errorEl.innerHTML = mess;
                return true;
            } else {
                inputEl.removeAttribute('error');
                errorEl.style.display = 'none';
            }
        }

        let error = false;

        rules.some((rule) => {
            if(rule.required) {
                error = ruleRequired(inputRef.current, errorMessRef.current, rule.errorMessage);
                if (error) {
                    onNotValidChange(inputRef, errorMessRef, rule.errorMessage);
                    return true;
                };
            }
        });
    }

    useEffect(() => {
        let newValue = '';
        let realValue = '';

        valuesSelected.forEach((item, index) => {
            newValue += item.title;
            realValue += item.value;
            if(index < valuesSelected.length -1) {
                newValue += ', ';
                realValue += ', ';
            }
        });

        setUsableValue(newValue);
        setRealValue(realValue);
        onChange(valuesSelected);
    }, [valuesSelected]);

    useEffect(() => {
        inputRef.current.addEventListener('validate', checkRules, false);
    }, []);

    useEffect(() => {
        if(value.length != 0 && !valueAlreadyChanged) {
            let newValue = '';
            let realValue = '';
            let optionsArray = [];

            value.forEach((item, index) => {
                let optionElement = parentOfChildrenRef.current.querySelector(`[data-value="${item}"]`);
                if(optionElement) {
                    let textOfValue = optionElement.textContent;
                    optionsArray = [...optionsArray, { value: item, title: textOfValue }]
                    newValue += textOfValue;
                    realValue += item;
                    if(index < value.length -1) {
                        newValue += ', ';
                        realValue += ', ';
                    }
                }
            });
            setValuesSelected(optionsArray);
            setUsableValue(newValue);
            setRealValue(realValue);
        }
    }, [children]);

    return (
        <Group disallowFormGroup={disallowFormGroup}>
            <input ref={inputRef} value={realValue} className='cryo-control cryo-select' style={{display: 'none'}} value={realValue} name={name} onChange={() => {}} />
            <div style={{position: 'relative'}}>
                <small {...errorMessProps} ref={errorMessRef} className={`cryo-error-mess cryo-mb ${(errorMessProps.className ? errorMessProps.className : '')}`}></small>
                {label && (
                    <div>
                        <span className='cryo-label-global'><label>{label}</label> {rules.some(() => item => item.required == true) && <span>*</span>}</span>
                    </div>
                )}

                <button ref={optionsTitleRef} className='cryo-select' type='button' onClick={openOptions}>{valuesSelected.length == 0 ? title : usableValue}</button>
                
                <div className='cryo-select-options' ref={optionsRef} style={{display: 'none'}}>
                    <SelectContext.Provider value={{selectedValues: valuesSelected, setValueHandler: setValues, removeValueHandler: removeValue}}>
                        <div ref={parentOfChildrenRef} className='cryo-select-options-wrap' style={{maxHeight: maxHeight}}>
                            {children}
                        </div>
                    </SelectContext.Provider>
                </div>
            </div>
        </Group>
    )
}

export default Select;