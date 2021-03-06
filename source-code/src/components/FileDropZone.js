import React, { useRef, useEffect } from 'react';
import Group from './HOC/Group';

const ruleFileRequired = (dropZoneEl, errorMess) => {
    let filesAttribute = dropZoneEl.getAttribute('data-files');
    let files = [];
    if(filesAttribute){
        files = dropZoneEl.getAttribute('data-files').split(',');
    }

    if(files.length == 0) {
        dropZoneEl.setAttribute('error', errorMess);
        return true;
    } else {
        dropZoneEl.removeAttribute('error');
    }
}

const FileDropZone = ({name, children, mouseEnterHandler = () => {}, mouseLeaveHandler = () => {}, multiFile = true, multiFileErrorHandler = () => {}, rules = [], onNotValidChange = () => {}, onChange = () => {}, browseFileOnClick = true, disallowFormGroup}) => {
    const dropZoneRef = useRef(null);

    const highlight = () => {
        mouseEnterHandler();
    }

    const unhighlight = () => {
        mouseLeaveHandler();
    }

    const handleFiles = files => {
        let filesString = "";
        Array.from(files).forEach((item, index) => {
            filesString += URL.createObjectURL(item);
            if(files.length - 1 > index){
                filesString += ",";
            }
        });

        dropZoneRef.current.setAttribute("data-files", filesString);
        onChange(files, filesString);
    }

    const handleDrop = (e) => {
        let dt = e.dataTransfer;
        let files = dt.files;

        if(!multiFile && files.length != 1){
            multiFileErrorHandler();
            return;
        }

        handleFiles(files);
        checkRules();
    }

    const checkRules = () => {
        rules.some((item) => {
            if(item.required){
                let error = ruleFileRequired(dropZoneRef.current, item.errorMessage);
                if(error) {
                    onNotValidChange(dropZoneRef);
                    return true;
                }
            }
        });
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

        dropZoneRef.current.addEventListener('drop', handleDrop, false);
        dropZoneRef.current.addEventListener('validate', checkRules, false);

        if(browseFileOnClick) {
            dropZoneRef.current.addEventListener('click', () => {
                dropZoneRef.current.children[0].click();
            }, false);
        }
    }, []);

    return (
        <Group disallowFormGroup={disallowFormGroup}>
            <div name={name} className={`cryo-control cryo-file-input-dnd ${browseFileOnClick ? 'cryo-hover-pointer' : ''}`} ref={dropZoneRef}>
                {browseFileOnClick && (
                    <input onChange={event => handleFiles(event.target.files)} style={{display: 'none'}} type="file" />
                )}
                {children}
            </div>
        </Group>
    )
}

export default FileDropZone;