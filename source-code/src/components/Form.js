import React, { useEffect, useRef } from 'react';

/**
 * Creates Form that can be filled, saved very easilly with realtime input checking.
 * 
 * @component
 * @param {function} successFuncJson Function called when inputs are OK and send there json as first parameter. Example: (json) => {success(json)}
 * @param {function} successFuncFormData Function called when inputs are OK and send there FormData as first parameter. Example: (formData) => {success(formData)}
 * @param {failedFunc} failedFunc Function called when form is filled wrong and send there error detail as first parameter
 * @param {component} children Children means component inside like this <CryoForm>...Children...</CryoForm>
 * @param {cryoFormState} form This uses our own hook, you can create that hook like this: const [form] = cryoUseForm();
 * @example
 * const [form] = cryoUseForm();
 * 
 * const success = (json) => {
 *  form.clearInputs();
 *  console.log(json.name);
 * }
 * 
 * return (
 *  <Form successFuncJson={success}>
 *      <CryoInput label="Name" placeholder="name" name="name"  /> 
 *  </Form>
 * )
 */
const CryoForm = ({successFuncJson = null, successFuncFormData = null, failedFunc = () => {}, children, form = null}) => {
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

            let error = inputs[i].getAttribute('error');
            if(error){
                failedFunc(error);
                failed = true;
            }

            if(inputs[i] && inputs[i].classList.contains('cryo-custom-component')){
                formValue = {...formValue, [inputs[i].getAttribute('name')]: inputs[i].value}
                formData.append(inputs[i].getAttribute('name'), inputs[i].value);
                continue;
            }
            
            if(inputs[i] && inputs[i].classList.contains('cryo-input') && !inputs[i].classList.contains('cryo-file-input')) {
                formValue = {...formValue, [inputs[i].getAttribute('name')]: inputs[i].value}
                formData.append(inputs[i].getAttribute('name'), inputs[i].value);
                continue;
            }

            if(inputs[i] && inputs[i].classList.contains('cryo-switch-checkbox')){
                formValue = {...formValue, [inputs[i].getAttribute('name')]: inputs[i].checked}
                formData.append(inputs[i].getAttribute('name'), inputs[i].checked);
                continue;
            }

            if(inputs[i] && inputs[i].classList.contains('cryo-file-input')){
                formValue = {...formValue, [inputs[i].getAttribute('name')]: inputs[i].parentElement.children[2].files[0]}
                formData.append(inputs[i].getAttribute('name'), inputs[i].parentElement.children[2].files[0]);
                continue;
            }

            if(inputs[i] && inputs[i].classList.contains('cryo-file-input-dnd')) {
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

            if(inputs[i] && inputs[i].classList.contains('cryo-select')) {
                formValue = {...formValue, [inputs[i].getAttribute('name')]: inputs[i].value}
                formData.append(inputs[i].getAttribute('name'), inputs[i].value);
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

export default CryoForm;