import React, { useRef, useEffect } from 'react';

const FileDropZone = ({children, highlightFunction = () => {}, unHighlightFunction = () => {}, multiFile = true, multiFileErrorHandle = () => {}, multiFileMoreFilesEnterHandle = () => {}, mouseLeaveHandle = () => {}}) => {
    const dropZoneRef = useRef(null);

    const mouseLeave = () => {
        mouseLeaveHandle();
    }

    const highlight = () => {
        highlightFunction();
    }

    const unhighlight = () => {
        unHighlightFunction();
    }

    const handleFiles = files => {
        console.log(files);
    }

    const handleDrop = (e) => {
        let dt = e.dataTransfer;
        let files = dt.files;

        if(!multiFile && files.length != 1){
            multiFileErrorHandle();
            return;
        }

        handleFiles(files);
    }

    const preventDefaults = e => {
        e.preventDefault();
        e.stopPropagation();
    }

    useEffect(() => {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZoneRef.current.addEventListener(eventName, preventDefaults, false)
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZoneRef.current.addEventListener(eventName, highlight, false)
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZoneRef.current.addEventListener(eventName, unhighlight, false)
        });

        dropZoneRef.current.addEventListener('drop', handleDrop, false)
    }, []);

    return (
        <div className="cryo-group" ref={dropZoneRef} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            {children}
        </div>
    )
}

export default FileDropZone;