import { createContext } from 'react';

const SelectContext = createContext({selectedValues: [], setValueHandler: () => {}, removeValueHandler: () => {}});

export default SelectContext;