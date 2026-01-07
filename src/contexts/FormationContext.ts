import { createContext, Dispatch, SetStateAction } from 'react';

export interface FormationContextType {
  formation: number[];
  formationString: string;
  setFormation?: Dispatch<SetStateAction<number[]>>;
  setFormationString?: Dispatch<SetStateAction<string>>;
}

export const FormationContext = createContext<FormationContextType>({
  formation: [],
  formationString: '' 
});