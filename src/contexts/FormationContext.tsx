import React, { createContext, useMemo, useState, ReactNode } from 'react';

export interface FormationContextType {
  formation: number[];
  formationString: string;
  setFormation: (formation: number[]) => void;
  setFormationString: (formation: string) => void;
}

export const FormationContext = createContext<FormationContextType>({
  formation: [],
  formationString: '',
  setFormation: () => { /* default context function */ },
  setFormationString: () => { /* default context function */ }
});

const FormationProvider = ({ children } : { children: ReactNode }) => {
  const [formation, setFormation] = useState<number[]>([]);
  const [formationString, setFormationString] = useState<string>('');

  const value = useMemo(() => ({
    formation,
    formationString,
    setFormation,
    setFormationString
  }), [formation, formationString]);

  return (
    <FormationContext.Provider value={value}>
      {children}
    </FormationContext.Provider>
  )
}

export default FormationProvider;