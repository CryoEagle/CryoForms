import React, { useEffect, useState, useRef } from 'react';
import uuid from 'react-uuid';
import './Forms.scss';
import PropTypes from 'prop-types';
import FileDropZone from './FileDropZone';

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

export const CryoForm = ({successFuncJson = null, successFuncFormData = null, failedFunc = () => {}, children, form = null}) => {
    const formRef = useRef(null);

    useEffect(() => {
        if(formRef.current != null){
            if(form) {
                form.setData({formRef: formRef});
            }
        }
    }, []);

    const submit = e => {
        e.preventDefault();
        
        let inputs = Array.from(formRef.current.querySelectorAll('.cryo-control'));
        let failed = false;

        let formValue = {};
        let formData = new FormData();

        for(let i = 0; i < inputs.length; i++){
            let event = new CustomEvent('validate');
            inputs[i].dispatchEvent(event);

            let error = inputs[i].getAttribute("error");
            if(error){
                failedFunc(error);
                failed = true;
            }
            
            if(inputs[i] && inputs[i].classList.contains('cryo-input')) {
                formValue = {...formValue, [inputs[i].getAttribute('name')]: inputs[i].value}
                formData.append(inputs[i].getAttribute('name'), inputs[i].value);
                continue;
            }

            if(inputs[i] && inputs[i].classList.contains('cryo-switch-checkbox')){
                formValue = {...formValue, [inputs[i].getAttribute('name')]: inputs[i].checked}
                formData.append(inputs[i].getAttribute('name'), inputs[i].checked);
                continue;
            }

            if(inputs[i] && inputs[i].classList.contains('cryo-file-input')) {
                let filesAttribute = inputs[i].getAttribute('data-files');
                let files = [];
                if(filesAttribute){
                    files = inputs[i].getAttribute('data-files').split(',');
                    files.map((fileItem, index) => {
                        formData.append(`${inputs[i].getAttribute('name')}_${index}`, fileItem);
                    });
                }

                formValue = {...formValue, [inputs[i].getAttribute('name')]: files}
                continue;
            }
        }
        if(!failed) {
            if(successFuncJson){
                successFuncJson(formValue);
            }

            if(successFuncFormData){
                successFuncFormData(formData);
            }
        }
    } 

    return (
        <form ref={formRef} onSubmit={submit} className="cryo-form">
            {children}
        </form>
    )
}

CryoForm.propTypes = {
    successFuncJson: PropTypes.func,
    successFuncFormData: PropTypes.func,
    failedFunc: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.element),
    form: PropTypes.object
}

const ruleRequired = (inputEl, errorEl, mess) => {
    if(inputEl.value == ""){
        inputEl.setAttribute('error', mess);
        errorEl.style.display = 'block';
        errorEl.innerHTML = mess;
        return true;
    } else {
        inputEl.removeAttribute('error');
        errorEl.style.display = 'none';
    }
}

const ruleMinLength = (inputEl, errorEl, mess, length) => {
    if(inputEl.value.length < length){
        inputEl.setAttribute('error', mess);
        errorEl.style.display = 'block';
        errorEl.innerHTML = mess;
        return true;
    } else {
        inputEl.removeAttribute('error');
        errorEl.style.display = 'none';
    }
}

const ruleType = (inputEl, errorEl, mess, type) => {
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateNumber = (number) => {
        const re = /^\d+$/;
        return re.test(number);
    }
    
    if(type == "email" && !validateEmail(inputEl.value)){
        inputEl.setAttribute("error", mess);
        errorEl.style.display = 'block';
        errorEl.innerHTML = mess;
        return true;
    } else if (type == "number" && !validateNumber(inputEl.value)){
        inputEl.setAttribute("error", mess);
        errorEl.style.display = 'block';
        errorEl.innerHTML = mess;
        return true;
    } else {
        inputEl.removeAttribute("error");
        errorEl.style.display = 'none';
    }
}

export const CryoInput = ({defaultValue, label, placeholder, name, description, type, rows = 1, rules = [], autoComplete = "", inputProps = {}, errorMessProps = {}, descriptionProps = {}, onNotValidChange = () => {}, onValidChange = () => {}}) => {
    const id = uuid();
    const innerType = (type == undefined ? "text" : type)

    const inputRef = useRef(null);
    const errorMessRef = useRef(null);

    const checkRules = () => {
        let error = false;
        rules.some((rule) => {
            if(rule.required){
                error = ruleRequired(inputRef.current, errorMessRef.current, rule.errorMessage);
                if (error) {
                    onNotValidChange(inputRef, errorMessRef, rule.errorMessage);
                    return true;
                };
            }

            if(rule.type){
                error = ruleType(inputRef.current, errorMessRef.current, rule.errorMessage, rule.type);
                if (error) {
                    onNotValidChange(inputRef, errorMessRef, rule.errorMessage);
                    return true;
                };
            }

            if(rule.minLength){
                error = ruleMinLength(inputRef.current, errorMessRef.current, rule.errorMessage, rule.minLength);
                if(error) {
                    onNotValidChange(inputRef, errorMessRef, rule.errorMessage);
                    return true;
                }
            }
        });

        if(!error){
            onValidChange(inputRef, errorMessRef);
        }
    }

    const getInputClassName = () => {
        if(inputProps.className){
            return `cryo-control cryo-input ${inputProps.className}`;
        } else {
            return `cryo-control cryo-input`;
        }
    }

    const getId = () => {
        if(inputProps.id){
            return inputProps.id;
        } else {
            return id;
        }
    }

    let inputData = {
        className: getInputClassName(),
        id: getId(),
        placeholder: placeholder,
        name: name,
        type: innerType,
        rows: rows,
        onInput: checkRules,
        onBlur: checkRules
    }

    useEffect(() => {
        inputRef.current.addEventListener("validate", checkRules, false);
        if(defaultValue) {
            inputRef.current.value = defaultValue;
        }
    }, []);

    return (
        <div className={`cryo-inline cryo-group cryo-input`}>
            <small {...errorMessProps} ref={errorMessRef} className={`cryo-error-mess ${(errorMessProps.className ? errorMessProps.className : "")}`}></small>
            <div className="input">
                {innerType != "textarea" ? (
                    <input ref={inputRef} {...inputProps} {...inputData} autoComplete={autoComplete} />
                ) : (
                    <textarea ref={inputRef} {...inputProps} {...inputData} />
                )}
                {label && (
                    <div>
                        <span><label htmlFor={id}>{label}</label> {rules.some(() => item => item.required == true) && <span>*</span>}</span>
                    </div>
                )}
            </div>
            {description && (
                <small {...descriptionProps} className={`cryo-description ${(descriptionProps.className ? descriptionProps.className : "")}`}>{description} </small>
            )}
        </div>
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

export const CryoButton = ({children, block = false, buttonProps = {}, color, size = "casual"}) => {

    const setClassNames = () => {
        let classes = "";
        if(block){
            classes += "cryo-btn-block ";
        }

        if(color) {
            classes += `cryo-btn-${color} `
        }

        classes += `cryo-btn-${size} `;

        if(buttonProps.className){
            classes += `${buttonProps.className} `
        }

        return classes;
    }

    const classNames = setClassNames();

    return (
        <div className="cryo-group">
            <button type="submit" className={`cryo-btn ${classNames}`}>{children}</button>
        </div>
    )
}

CryoButton.propTypes = {
    block: PropTypes.bool,
    buttonProps: PropTypes.object,
    color: PropTypes.string,
    size: PropTypes.string
}

export const CryoSwitch = ({defaultValue, onColor = '#ff5722', label, name}) => {
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
                <div>
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
                </div>
                <div className="cryo-switch-description-wrapper">
                    <span className="cryo-switch-description">{label}</span>
                </div>
            </div>
        </div>
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
    onChange: PropTypes.func
}