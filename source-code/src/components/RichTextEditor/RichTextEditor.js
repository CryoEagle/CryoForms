import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const RichTextEditor = ({inputRef, height = '100px', inputProps, inputdata, quillModules, resetFieldHandler}) => {

    const changeInputRefValue = value => {
        let regex = /(<([^>]+)>)/ig;
        inputRef.current.value = value.replace(regex, '');
    }

    const resetField = () => {
        resetFieldHandler('');
    }

    useEffect(() => {
        inputRef.current.addEventListener('resetField', resetField, false);
    }, []);

    return (
        <div style={{width: '100%', minHeight: height}}>
            <input className='cryo-event-hook' ref={inputRef} style={{display: 'none'}} />

            <ReactQuill 
                value={inputdata.value}
                onChange={value => {changeInputRefValue(value); inputdata.onInput(value);}}
                {...inputProps}
                placeholder={inputdata.placeholder}
                modules={quillModules}
            />
        </div>
    )
}

export default RichTextEditor;