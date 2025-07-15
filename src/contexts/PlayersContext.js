import { createContext } from 'react';

export const PlayersContext = createContext({
  availablePlayers: null,
  setAvailablePlayers: null,
  formationPositions: null
});
