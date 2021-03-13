import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const RichTextEditor = ({inputRef, height = '100px', inputProps, inputdata, quillModules}) => {

    const changeInputRefValue = value => {
        let regex = /(<([^>]+)>)/ig;
        inputRef.current.value = value.replace(regex, '');
    }

    return (
        <div style={{width: '100%', minHeight: height}}>
            <input ref={inputRef} style={{ display: 'none' }} />

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