import React, { useRef, useEffect } from 'react';
import Group from '../HOC/Group';
import { CryoCustomInputSetter } from '../Forms';

const CustomComponent = ({disallowFormGroup, children, onClearInputs, name}) => {
    const inputRef = useRef(null);
    const eventHook = useRef(null);

    const clearInputs = () => {
        if(onClearInputs) {
            onClearInputs(inputRef.current);
        }
        
        inputRef.current.value = '';
    }

    const setValueForForm = () => {
        
    }

    useEffect(() => {   
        eventHook.current.addEventListener('resetField', clearInputs);
    }, []);

    return (
        <Group disallowFormGroup={disallowFormGroup}>
            <input name={name} className={'cryo-control cryo-custom-component'} ref={inputRef} style={{display: 'none'}} />
            <CryoCustomInputSetter.Provider value={{inputRef: inputRef}}>
                <div ref={eventHook} className='cryo-event-hook'>
                    {children}
                </div>
            </CryoCustomInputSetter.Provider>
        </Group>
    )
}

export default CustomComponent;