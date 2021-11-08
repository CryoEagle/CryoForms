import React, { useState, createContext } from 'react';
import './Forms.scss';
import PropTypes from 'prop-types';
import FileDropZone from './FileDropZone';
import Form from './Form';
import Input from './Input';
import Button from './Button';
import Switch from './Switch';
import Select from './Select/Select';
import Option from './Select/Option';
import CustomComponent from './CustomComponent/CustomComponent';
import { observer } from 'mobx-react';

export const cryoUseForm = () => {
    const [formData, setFormData] = useState({});

    const formFunctions = {
        clearInputs: () => {
            let inputs = Array.from(formData.formRef.current.querySelectorAll('.cryo-event-hook'));

            inputs.some((input) => {
                let event = new CustomEvent('resetField');
                input.dispatchEvent(event);
            });
        },
        getJsonData: () => { // works differently than submit because we are not validating inputs
            let inputs = Array.from(formData.formRef.current.querySelectorAll('.cryo-control'));
            let formValue = {};

            for(let i = 0; i < inputs.length; i++){
                if(inputs[i] && inputs[i].classList.contains('cryo-custom-component')){
                    formValue = {...formValue, [inputs[i].getAttribute('name')]: inputs[i].value}
                    continue;
                }
                
                if(inputs[i] && inputs[i].classList.contains('cryo-input') && !inputs[i].classList.contains('cryo-file-input')) {
                    formValue = {...formValue, [inputs[i].getAttribute('name')]: inputs[i].value}
                    continue;
                }
    
                if(inputs[i] && inputs[i].classList.contains('cryo-switch-checkbox')){
                    formValue = {...formValue, [inputs[i].getAttribute('name')]: inputs[i].checked}
                    continue;
                }
    
                if(inputs[i] && inputs[i].classList.contains('cryo-file-input')){
                    formValue = {...formValue, [inputs[i].getAttribute('name')]: inputs[i].parentElement.children[2].files[0]}
                    continue;
                }
    
                if(inputs[i] && inputs[i].classList.contains('cryo-file-input-dnd')) {
                    let filesAttribute = inputs[i].getAttribute('data-files');
                    let files = [];
                    if(filesAttribute){
                        files = inputs[i].getAttribute('data-files').split(',');
                    }
    
                    formValue = {...formValue, [inputs[i].getAttribute('name')]: files}
                    continue;
                }
    
                if(inputs[i] && inputs[i].classList.contains('cryo-select')) {
                    formValue = {...formValue, [inputs[i].getAttribute('name')]: inputs[i].value}
                    continue;
                }
            }

            return formValue;
        },
        getFormData: () => {

            let inputs = Array.from(formData.formRef.current.querySelectorAll('.cryo-control'));
            let formDataInner = new FormData();

            for(let i = 0; i < inputs.length; i++){
                if(inputs[i] && inputs[i].classList.contains('cryo-custom-component')){
                    formDataInner.append(inputs[i].getAttribute('name'), inputs[i].value);
                    continue;
                }
                
                if(inputs[i] && inputs[i].classList.contains('cryo-input') && !inputs[i].classList.contains('cryo-file-input')) {
                    formDataInner.append(inputs[i].getAttribute('name'), inputs[i].value);
                    continue;
                }
    
                if(inputs[i] && inputs[i].classList.contains('cryo-switch-checkbox')){
                    formDataInner.append(inputs[i].getAttribute('name'), inputs[i].checked);
                    continue;
                }
    
                if(inputs[i] && inputs[i].classList.contains('cryo-file-input')){
                    formDataInner.append(inputs[i].getAttribute('name'), inputs[i].parentElement.children[2].files[0]);
                    continue;
                }
    
                if(inputs[i] && inputs[i].classList.contains('cryo-file-input-dnd')) {
                    let filesAttribute = inputs[i].getAttribute('data-files');
                    let files = [];
                    if(filesAttribute){
                        files = inputs[i].getAttribute('data-files').split(',');
                        files.map((fileItem, index) => {
                            formDataInner.append(`${inputs[i].getAttribute('name')}_${index}`, fileItem);
                        });
                    }
                    continue;
                }
    
                if(inputs[i] && inputs[i].classList.contains('cryo-select')) {
                    formDataInner.append(inputs[i].getAttribute('name'), inputs[i].value);
                    continue;
                }
            }

            return formDataInner;
        }
    };

    return  [{form: formData, setData: setFormData, ...formFunctions}];
}

export const CryoCustomInputSetter = createContext({inputRef: null});

export const CryoForm = (props) => { 
    return (
        <Form {...props} />
    )
}

CryoForm.propTypes = {
    successFuncJson: PropTypes.func,
    successFuncFormData: PropTypes.func,
    failedFunc: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.element),
    form: PropTypes.object
}

/**
 * @typedef InputRules
 * @type {Object}
 * @property {string} errorMessage
 * @property {number} minLength
 * @property {number} maxLength
 * @property {("email"|"number")} type
 */

/**
 * 
 * @param {{rules: Array.<InputRules>}} props 
 */
const CryoInput = (props) => {
    return (
        <Input {...props} />
    )
}

CryoInput.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    rows: PropTypes.number,
    autoComplete: PropTypes.string,
    inputProps: PropTypes.object,
    errorMessProps: PropTypes.object,
    onNotValidChange: PropTypes.func,
    onValidChange: PropTypes.func,
    descriptionProps: PropTypes.object,
    defaultValue: PropTypes.string,
    fileInputRightSideText: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    disallowFormGroup: PropTypes.bool,
    quillModules: PropTypes.object
}

export { CryoInput };

export const CryoButton = (props) => {
    return (
        <Button {...props} />
    )
}

CryoButton.propTypes = {
    block: PropTypes.bool,
    buttonProps: PropTypes.object,
    color: PropTypes.string,
    size: PropTypes.string,
    disallowFormGroup: PropTypes.bool,
    onClick: PropTypes.func,
    type: PropTypes.string
}

export const CryoSwitch = (props) => {
    return (
        <Switch {...props} />
    )
}

CryoSwitch.propTypes = {
    defaultValue: PropTypes.bool,
    onColor: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    disallowFormGroup: PropTypes.bool
}

export const CryoFileDropZone = (props) => {
    return (
        <FileDropZone {...props} />
    )
}

CryoFileDropZone.propTypes = {
    mouseEnterHandler: PropTypes.func,
    mouseLeaveHandler: PropTypes.func,
    name: PropTypes.string,
    multiFile: PropTypes.bool,
    multiFileErrorHandler: PropTypes.func,
    rules: PropTypes.array,
    onNotValidChange: PropTypes.func,
    onChange: PropTypes.func,
    browseFileOnClick: PropTypes.bool,
    disallowFormGroup: PropTypes.bool
}

export const CryoSelect = (props) => {
    return (
        <Select {...props} />
    )
}

CryoSelect.propTypes = {
    label: PropTypes.string,
    rules: PropTypes.array,
    multiSelect: PropTypes.bool,
    title: PropTypes.string,
    maxHeight: PropTypes.number,
    disallowFormGroup: PropTypes.bool,
    name: PropTypes.string,
    value: PropTypes.array
}

export const CryoOption = (props) => {
    return (
        <Option {...props} />
    )
}

CryoOption.propTypes = {
    value: PropTypes.any,
    selectedBackgroundColor: PropTypes.string,
    selectedColor: PropTypes.string
}

export const CryoCustomComponent = (props) => {
    return (
        <CustomComponent {...props} />
    )
}

CryoCustomComponent.propTypes = {
    disallowFormGroup: PropTypes.bool,
    children: PropTypes.element,
    onClearInputs: PropTypes.func,
    name: PropTypes.string
}