import React from 'react';
import { CryoInput } from '../components/Forms';

const Input = () => {
    return (
        <CryoInput rules={[{errorMessage: 'lol', type: ''}]} />
    )
}