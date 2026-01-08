import React, { createContext, useMemo, useState } from 'react';
import { JerseyColourType } from '../types/types';

interface JerseyContextType {
  jerseyColour: JerseyColourType;
  setJerseyColour: (color: JerseyColourType) => void;
}

export const JerseyContext = createContext<JerseyContextType>({
  jerseyColour: 'home',
  setJerseyColour: () => { /* default context function */ }
});

const JerseyProvider = ({ children } : { children: React.ReactNode }) => {
  const [jerseyColour, setJerseyColour] = useState<JerseyColourType>('home');

  const value = useMemo(() => ({
    jerseyColour,
    setJerseyColour
  }), [jerseyColour]);

  return (
    <JerseyContext.Provider value={value}>
      {children}
    </JerseyContext.Provider>
  )
}

export default JerseyProvider;