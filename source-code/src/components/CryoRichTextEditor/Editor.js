import React, { useRef } from 'react';
import Toolbar from './Toolbar';
import InTextToolbar from './InTextToolbar';
import './Editor.scss'

const Editor = ({inputRef, height = '100px', showToolbar = false, showInTextToolbar = true}) => {
    
    const inTextToolbarRef = useRef(null);

    const getSelection = () => {
        let t = '';

        if(window.getSelection) {
            t = window.getSelection();
        } else if (document.getSelection) {
            t = document.getSelection();
        } else if (document.selection) {
            t = document.selection.createRange().text;
        }

        return t;
    }

    const textSelectedHandler = e => {
        let selectedText = getSelection();
        console.log(e.pageX);
        if(inTextToolbarRef.current) {
            inTextToolbarRef.current.style.left = `${e.pageX}px`;
            inTextToolbarRef.current.style.top = `${e.pageY}px`;
        }
    }

    return (
        <div style={{position: 'relative', width: '100%', height: '100%'}}>
            <input ref={inputRef} style={{display: 'none'}} />

            {showToolbar && (
                <Toolbar />
            )}

            {showInTextToolbar && (
                <InTextToolbar toolbarRef={inTextToolbarRef} />
            )}

            <div
                className='cryo-richtext' 
                contentEditable={true}
                onMouseUp={textSelectedHandler}

                style={{height: height, width: '100%'}}
            >
                
            </div>
        </div>
    )
}

export default Editor;