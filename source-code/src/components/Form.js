import React, { useEffect, useRef } from 'react';

const Form = ({successFuncJson = null, successFuncFormData = null, failedFunc = () => {}, children, form = null}) => {
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

export default Form;