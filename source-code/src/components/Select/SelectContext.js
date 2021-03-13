import { createContext } from 'react';

const SelectContext = createContext({optionSelected: () => {}, optionUnselected: () => {}, multiSelect: false, optionsSelected: []});

export default SelectContext;