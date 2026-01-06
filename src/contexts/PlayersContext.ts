import { createContext, Dispatch, SetStateAction } from 'react';
import { PlayerType } from '../util/playerDataSet';

interface PlayersContextType {
  availablePlayers: PlayerType[];
  setAvailablePlayers: Dispatch<SetStateAction<PlayerType[]>>;
  formationPositions: string[];
}

export const PlayersContext = createContext<PlayersContextType>({
  availablePlayers: [],
  setAvailablePlayers: () => { /* default context function */ },
  formationPositions: []
});
