import React, { useState, useRef } from 'react';
import './Forms.scss';
import PropTypes from 'prop-types';
import FileDropZone from './FileDropZone';
import Form from './Form';
import Input from './Input';
import Button from './Button';
import Switch from './Switch';

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
    defaultValue: PropTypes.string
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
    size: PropTypes.string
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
    name: PropTypes.string
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
    browseFileOnClick: PropTypes.bool
}