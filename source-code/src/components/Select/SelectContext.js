import { createContext } from 'react';

const SelectContext = createContext({optionSelected: () => {}, optionUnselected: () => {}, multiSelect: false, optionsSelected: [], selectedRefData: {}});

export default SelectContext;