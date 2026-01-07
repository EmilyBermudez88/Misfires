import { createContext, Dispatch, SetStateAction } from 'react';
import { PlayerType } from '../util/playerDataSet';
import { AvailablePositions } from '../util/lineupData';

interface PlayersContextType {
  availablePlayers: PlayerType[];
  setAvailablePlayers: Dispatch<SetStateAction<PlayerType[]>>;
  formationPositions: AvailablePositions[];
}

export const PlayersContext = createContext<PlayersContextType>({
  availablePlayers: [],
  setAvailablePlayers: () => { /* default context function */ },
  formationPositions: []
});
