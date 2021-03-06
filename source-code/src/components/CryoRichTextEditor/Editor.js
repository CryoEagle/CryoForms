import React, { useRef, useState, useEffect } from 'react';
import Toolbar from './Toolbar';
import InTextToolbar from './InTextToolbar';
import './Editor.scss';

const Editor = ({inputRef, height = '100px', showToolbar = false, showInTextToolbar = true}) => {
    
    const [selectData, setSelectData] = useState({mouseDown: false, firstTop: 0, firstLeft: 0, secondTop: 0, secondLeft: 0});
    const inTextToolbarRef = useRef(null);
    const editorRef = useRef(null);

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

    const getSelectionLeftTop = e => {
        let selectedText = getSelection();

        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;

        let bodyRect = document.body.getBoundingClientRect();
        let editorRect = editorRef.current.getBoundingClientRect();

        let oRange = selectedText.getRangeAt(0);
        let oRect = oRange.getBoundingClientRect();
        let y = oRect.top - bodyRect.top - editorRect.top;
        return [x, y];
    }

    const mouseDown = e => {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;

        setSelectData({...selectData, mouseDown: true, firstLeft: x});
    }

    const mouseUp = e => {
        setSelectData({...selectData, mouseDown: false});
    }

    const textSelectedHandler = e => {
        let selectedText = getSelection();

        if(inTextToolbarRef.current) {
            if(selectedText.type == 'Range' && selectData.mouseDown){
                let [x, y] = getSelectionLeftTop(e);

                let centerX = Math.round((x + selectData.firstLeft)/2)

                inTextToolbarRef.current.style.left = `${centerX}px`;
                inTextToolbarRef.current.style.top = `${y}px`;
                inTextToolbarRef.current.style.opacity = 1;
            } else if (selectedText.type == 'Caret') {
                inTextToolbarRef.current.style.opacity = 0;
            }
        }
    }

    useEffect(() => {
        document.onclick = () => {
            let selectedText = getSelection();
            if(inTextToolbarRef.current && selectedText.type == 'Caret') {
                inTextToolbarRef.current.style.opacity = 0;
            }
        }
    });

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
                onMouseMove={textSelectedHandler}
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
                ref={editorRef}

                style={{height: height, width: '100%'}}
            >
                
            </div>
        </div>
    )
}

export default Editor;