import React, { useEffect, useState, useRef } from 'react';
import uuid from 'react-uuid';

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

const Input = ({defaultValue, label, placeholder, name, description, type, rows = 1, rules = [], autoComplete = "", inputProps = {}, errorMessProps = {}, descriptionProps = {}, onNotValidChange = () => {}, onValidChange = () => {}}) => {
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

export default Input;