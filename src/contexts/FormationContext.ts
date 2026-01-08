import { createContext } from 'react';

export interface FormationContextType {
  formation: number[];
  formationString: string;
  setFormation?: (formation: number[]) => void;
  setFormationString?: (formation: string) => void;
}

export const FormationContext = createContext<FormationContextType>({
  formation: [],
  formationString: ''
});