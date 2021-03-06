import React from 'react';

const InTextToolbar = ({toolbarRef}) => {
    return (
        <div ref={toolbarRef} className='cryo-in-text-toolbar'>
            <div className='cryo-in-text-toolbar-item'>
                <span><b>B</b></span>
            </div>

            <div className='cryo-in-text-toolbar-item'>
                <span><i>I</i></span>
            </div>

            <div className='cryo-in-text-toolbar-item'>
                <span style={{textDecoration: 'underline'}}>U</span>
            </div>

            <div className='cryo-in-text-toolbar-item' style={{paddingLeft: 3, paddingRight: 3}}>
                <span>H1</span>
            </div>

            <div className='cryo-in-text-toolbar-item' style={{paddingLeft: 3, paddingRight: 3}}>
                <span>H2</span>
            </div>

            <div className='cryo-in-text-toolbar-item' style={{paddingLeft: 3, paddingRight: 3}}>
                <span>H3</span>
            </div>
        </div>
    )
}

export default InTextToolbar;