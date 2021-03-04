import React from 'react';
import Toolbar from './Toolbar';

import './RichTextEditor.scss';

const RichTextEdit = ({inputRef, inputProps, inputData}) => {
    const paste = e => {

    }
  
    return (
        <>
            <input style={{display: 'none'}} ref={inputRef} />
            <Toolbar />
            <div>
                <div
                    className='editor'
                    id='editor'
                    contentEditable='true'
                    data-placeholder='Body...'
                    onPaste={(e) => paste(e)}
                ></div>
            </div>
        </>
    );
}

export default RichTextEdit;