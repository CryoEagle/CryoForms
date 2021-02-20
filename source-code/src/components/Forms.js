import React, { useEffect, useState, useRef } from 'react';
import uuid from 'react-uuid';
import './Forms.scss';
import PropTypes from 'prop-types';

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

export const CryoForm = ({successFunc = () => {}, failedFunc = () => {}, children, form = null}) => {
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
        let formValue = {};
        let failed = false;

        inputs.some((input) => {
            var event = new CustomEvent('validate');
            input.dispatchEvent(event);

            let error = input.getAttribute("error");
            if(error){
                failedFunc(error);
                failed = true;
            }

            if(input) {
                formValue = {...formValue, [input.getAttribute("name")]: input.value}
            }
        });
        
        if(!failed) successFunc(formValue);
    } 

    return (
        <form ref={formRef} onSubmit={submit} className="cryo-form">
            {children}
        </form>
    )
}

CryoForm.propTypes = {
    successFunc: PropTypes.func,
    failedFunc: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.element),
    form: PropTypes.object
}

const ruleRequired = (inputEl, errorEl, mess) => {
    if(inputEl.value == ""){
        inputEl.setAttribute("error", mess);
        errorEl.style.display = 'block';
        errorEl.innerHTML = mess;
        return true;
    } else {
        inputEl.removeAttribute("error");
        errorEl.style.display = 'none';
    }
}

const ruleMinLength = (inputEl, errorEl, mess, length) => {
    if(inputEl.value.length < length){
        inputEl.setAttribute("error", mess);
        errorEl.style.display = 'block';
        errorEl.innerHTML = mess;
        return true;
    } else {
        inputEl.removeAttribute("error");
        errorEl.style.display = 'none';
    }
}

const ruleType = (inputEl, errorEl, mess, type) => {
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    if(type == "email" && !validateEmail(inputEl.value)){
        inputEl.setAttribute("error", mess);
        errorEl.style.display = 'block';
        errorEl.innerHTML = mess;
        return true;
    } else {
        inputEl.removeAttribute("error");
        errorEl.style.display = 'none';
    }
}

const displayList = ['outlined','material']

export const CryoInput = ({label, placeholder, name, description, type, rows = 1, rules = [], display = "outlined", autoComplete = "", inputProps = {}, errorMessProps = {}, onNotValidChange = () => {}, onValidChange = () => {}}, descriptionProps = {}) => {
    const id = uuid();
    const innerType = (type == undefined ? "text" : type)

    const inputRef = useRef(null);
    const errorMessRef = useRef(null);

    const getDisplay = () => {
        let rigthDisplay = display;
        if(!displayList.includes(rigthDisplay)){
            rigthDisplay = "outlined";
        }

        return rigthDisplay;
    }

    const displayLocal = getDisplay();

    const checkRules = () => {
        let error = false;
        rules.filter((rule) => {
            if(rule.required){
                error = ruleRequired(inputRef.current, errorMessRef.current, rule.errorMessage);
                if (error) {
                    onNotValidChange(inputRef.current, errorMessRef.current, rule.errorMessage);
                    return true;
                };
            }

            if(rule.type){
                error = ruleType(inputRef.current, errorMessRef.current, rule.errorMessage, rule.type);
                if (error) {
                    onNotValidChange(inputRef.current, errorMessRef.current, rule.errorMessage);
                    return true;
                };
            }

            if(rule.minLength){
                error = ruleMinLength(inputRef.current, errorMessRef.current, rule.errorMessage, rule.minLength);
                if(error) {
                    onNotValidChange(inputRef.current, errorMessRef.current, rule.errorMessage);
                    return true;
                }
            }
        });

        if(!error){
            onValidChange(inputRef.current, errorMessRef.current);
        }
    }

    const inputData = {
        className: 'cryo-control',
        id: id,
        placeholder: placeholder,
        name: name,
        type: innerType,
        rows: rows,
        onInput: checkRules,
        onBlur: checkRules
    }

    useEffect(() => {
        inputRef.current.addEventListener("validate", checkRules, false);
    }, []);

    return (
        <div className={`cryo-${displayLocal} cryo-group cryo-input`}>
            <small {...errorMessProps} ref={errorMessRef} className={`cryo-error-mess ${(errorMessProps.className ? errorMessProps.className : "")}`}></small>
            <div className="input">
                {innerType != "textarea" ? (
                    <input ref={inputRef} {...inputData} autoComplete={autoComplete} {...inputProps}/>
                ) : (
                    <textarea ref={inputRef} {...inputData} {...inputProps} />
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
    display: PropTypes.oneOf(displayList),
    autoComplete: PropTypes.string,
    inputProps: PropTypes.object,
    errorMessProps: PropTypes.object,
    onNotValidChange: PropTypes.func,
    onValidChange: PropTypes.func,
    descriptionProps: PropTypes.object
}

export const CryoButton = ({children, block = false}) => {

    const setClassNames = () => {
        let classes = "";
        if(block){
            classes += "cryo-btn-block ";
        }

        return classes;
    }

    const classNames = setClassNames();

    return (
        <div className="cryo-group">
            <button type="submit" className={`cryo-btn cryo-btn-primary ${classNames}`}>{children}</button>
        </div>
    )
}

CryoButton.propTypes = {
    block: PropTypes.bool
}