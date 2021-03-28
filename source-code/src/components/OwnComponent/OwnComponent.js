import React from 'react';
import Group from '../HOC/Group';

const OwnComponent = ({disallowFormGroup, children, onClearInputs, customRules, value}) => {
    return (
        <Group disallowFormGroup={disallowFormGroup}>
            <div className='cryo-event-hook'>
                {children}
            </div>
        </Group>
    )
}

export default OwnComponent;