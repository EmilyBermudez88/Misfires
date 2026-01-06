import { createContext } from 'react';

export interface FormationContextType {
  formation: number[];
}

export const FormationContext = createContext<FormationContextType>({ formation: []});