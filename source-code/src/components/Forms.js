import React, { useState } from 'react';
import './Forms.scss';
import PropTypes from 'prop-types';
import FileDropZone from './FileDropZone';
import Form from './Form';
import Input from './Input';
import Button from './Button';
import Switch from './Switch';
import Select from './Select/Select';
import Option from './Select/Option';

export const cryoUseForm = () => {
    const [formData, setFormData] = useState({});

    const formFunctions = {
        clearInputs: () => {
            let inputs = Array.from(formData.formRef.current.querySelectorAll('.cryo-control'));

            inputs.some((input) => {
                input.value = "";
            });
        }
    };

    return  [{form: formData, setData: setFormData, ...formFunctions}];
}

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

export const CryoInput = (props) => {
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
    rules: PropTypes.array,
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
    disallowFormGroup: PropTypes.bool
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
    maxHeight: PropTypes.number
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