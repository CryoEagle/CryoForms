import React, { useEffect, useRef, useState } from 'react';
import uuid from 'react-uuid';
import Group from './HOC/Group';
import RichTextEditor from './RichTextEditor/RichTextEditor';

const ruleRequired = (inputEl, errorEl, mess, fileInput) => {
    if(!inputEl.classList.contains('cryo-file-input')){
        if(inputEl.value == ""){
            inputEl.setAttribute('error', mess);
            errorEl.style.display = 'block';
            errorEl.innerHTML = mess;
            return true;
        } else {
            inputEl.removeAttribute('error');
            errorEl.style.display = 'none';
        }
    } else {
        if(fileInput.current.files.length == 0){
            inputEl.setAttribute('error', mess);
            errorEl.style.display = 'block';
            errorEl.innerHTML = mess;
            return true;
        } else {
            inputEl.removeAttribute('error');
            errorEl.style.display = 'none';
        }
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

const ruleMaxLength = (inputEl, errorEl, mess, length) => {
    if(inputEl.value.length > length){
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
    
    if(type == 'email' && !validateEmail(inputEl.value)){
        inputEl.setAttribute('error', mess);
        errorEl.style.display = 'block';
        errorEl.innerHTML = mess;
        return true;
    } else if (type == 'number' && !validateNumber(inputEl.value)){
        inputEl.setAttribute('error', mess);
        errorEl.style.display = 'block';
        errorEl.innerHTML = mess;
        return true;
    } else {
        inputEl.removeAttribute('error');
        errorEl.style.display = 'none';
    }
}

const DefaultFileUploadRightSide = ({fileInputRightSideText = 'Choose file'}) => {
    return (
        <div style={{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,.4)', borderRadius: '0 4px 4px 0'}} className="cryo-hover-pointer"><span style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', whiteSpace: 'nowrap', color: 'white'}}>{fileInputRightSideText}</span></div>
    )
}

const Input = ({defaultValue, value = "", onChange = () => {}, label, placeholder, name, description, type = 'text', rows = 1, rules = [], autoComplete = "", inputProps = {}, errorMessProps = {}, descriptionProps = {}, onNotValidChange = () => {}, onValidChange = () => {}, fileInputRightSideText, disallowFormGroup, quillModules}) => {
    const [valueState, setValueState] = useState((defaultValue ? defaultValue : value));
    
    const id = uuid();
    const innerType = type;

    const inputRef = useRef(null);
    const errorMessRef = useRef(null);
    const fileInputRef = useRef(null);

    const checkRules = () => {
        let error = false;
        rules.some((rule) => {
            if(rule.required) {
                error = ruleRequired(inputRef.current, errorMessRef.current, rule.errorMessage, fileInputRef);
                if (error) {
                    onNotValidChange(inputRef, errorMessRef, rule.errorMessage);
                    return true;
                };
            }

            if(rule.type) {
                error = ruleType(inputRef.current, errorMessRef.current, rule.errorMessage, rule.type);
                if (error) {
                    onNotValidChange(inputRef, errorMessRef, rule.errorMessage);
                    return true;
                };
            }

            if(rule.minLength) {
                error = ruleMinLength(inputRef.current, errorMessRef.current, rule.errorMessage, rule.minLength);
                if(error) {
                    onNotValidChange(inputRef, errorMessRef, rule.errorMessage);
                    return true;
                }
            }

            if(rule.maxLength) {
                error = ruleMaxLength(inputRef.current, errorMessRef.current, rule.errorMessage, rule.maxLength);
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
        let classes = "";

        if(inputProps.className){
            classes += `cryo-control cryo-event-hook cryo-input ${inputProps.className}`;
        } else {
            classes += `cryo-control cryo-event-hook cryo-input`;
        }

        if(innerType == 'file'){
            classes += ' cryo-hover-pointer cryo-event-hook cryo-file-input';
        }

        return classes;
    }

    const getId = () => {
        if(inputProps.id){
            return inputProps.id;
        } else {
            return id;
        }
    }

    const inputChange = e => {
        setValueState(e.target.value);
        onChange(e);
    }

    const inputRichTextChange = value => {
        setValueState(value);
        onChange(value);
    }

    let inputData = {
        className: getInputClassName(),
        id: getId(),
        placeholder: placeholder,
        name: name,
        type: innerType,
        rows: rows,
        onInput: (innerType != 'richtext' ? e => { inputChange(e); checkRules(); } : value => { inputRichTextChange(value); checkRules(); }),
        onBlur: checkRules,
        value: valueState,
        onChange: (inputProps.onChange ? inputProps.onChange : () => {})
    }

    const resetField = () => {
        errorMessRef.current.style.display = 'none';
        inputRef.current.value = '';
        if(fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    useEffect(() => {
        inputRef.current.addEventListener('validate', checkRules, false);
        inputRef.current.addEventListener('resetField', resetField, false);
        
        if(defaultValue) {
            inputRef.current.value = defaultValue;
        }
    }, []);

    const openFile = () => {
        fileInputRef.current.click();
    }

    const fileInputChange = e => {
        let files = e.target.files;
        if(files.length != 0) {
            onChange(files[0]);
            inputRef.current.value = files[0].name;
            inputRef.current.setAttribute('data-file-blob', URL.createObjectURL(files[0]));
        }
    }

    return (
        <Group disallowFormGroup={disallowFormGroup}>
            <div className={`cryo-inline cryo-input`}>
                <small {...errorMessProps} ref={errorMessRef} className={`cryo-error-mess ${!label ? 'cryo-mb': ''} ${(errorMessProps.className ? errorMessProps.className : '')}`}></small>
                <div className="cryo-input">
                    {(innerType == 'text' || innerType ==  'password') && (
                        <input ref={inputRef} {...inputProps} {...inputData} autoComplete={autoComplete} />
                    )}

                    {innerType == 'textarea' && (
                        <textarea ref={inputRef} {...inputProps} {...inputData} />
                    )}

                    {innerType == 'richtext' && (
                        <RichTextEditor inputRef={inputRef} inputProps={{...inputProps}} inputdata={{...inputData}} quillModules={quillModules} />
                    )}
                    
                    {innerType == 'file' && (
                        <div style={{display: 'flex', flexWrap: 'nowrap', width: '100%'}} onClick={openFile}>
                            <input ref={inputRef} {...inputProps} {...inputData} type="text" disabled={true} autoComplete={autoComplete} style={{width: '70%', borderRadius: '4px 0 0 4px'}} />
                            <div style={{width: '30%', height: '100%', position: 'relative'}}><DefaultFileUploadRightSide fileInputRightSideText={fileInputRightSideText} /></div>
                            <input onChange={fileInputChange} ref={fileInputRef} type="file" style={{display: 'none'}} />
                        </div>
                    )}

                    {label && (
                        <div className='cryo-label'>
                            <span><label htmlFor={id}>{label}</label> {rules.some(() => item => item.required == true) && <span>*</span>}</span>
                        </div>
                    )}
                </div>
                {description && (
                    <small {...descriptionProps} className={`cryo-description ${(descriptionProps.className ? descriptionProps.className : "")}`}>{description} </small>
                )}
            </div>
        </Group>
    )
}

export default Input;