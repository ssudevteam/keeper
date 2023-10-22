import React, { createContext, useContext, useState } from 'react';

const HiveContext = createContext();

export const HiveProvider = ({ children }) => {
  const [selectedHiveIds, setSelectedHiveIds] = useState([]);

  return (
    <HiveContext.Provider value={{ selectedHiveIds, setSelectedHiveIds }}>
      {children}
    </HiveContext.Provider>
  );
};

export const useHiveContext = () => useContext(HiveContext);
