import React from 'react';

const Group = ({children, disallowFormGroup}) => {
    return (
        <div className={(!disallowFormGroup ? 'cryo-group' : '')}>
            {children}
        </div>
    )
}

export default Group;