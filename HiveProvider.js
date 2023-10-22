import React, {createContext, useContext, useState} from 'react';

const HiveContext = createContext();

export const HiveProvider = ({children}) => {
    const [selectedHives, setSelectedHives] = useState([]);

    return (
        <HiveContext.Provider value={{selectedHives, setSelectedHives}}>
            {children}
        </HiveContext.Provider>
    );
};

export const useHiveContext = () => useContext(HiveContext);
