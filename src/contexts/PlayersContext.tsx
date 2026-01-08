import React, { createContext, useMemo, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import playerDataSet from '../utils/playerDataSet';
import { PlayerType, AvailablePositions } from '../types/types';

interface PlayersContextType {
  availablePlayers: PlayerType[];
  setAvailablePlayers: Dispatch<SetStateAction<PlayerType[]>>;
  formationPositions: AvailablePositions[];
  setFormationPositions: (positions: AvailablePositions[]) => void;
}

export const PlayersContext = createContext<PlayersContextType>({
  availablePlayers: [],
  setAvailablePlayers: () => { /* default context function */ },
  formationPositions: [],
  setFormationPositions: () => { /* default context function */ }
});

const PlayersProvider = ({ children } : { children: ReactNode }) => {
  const [availablePlayers, setAvailablePlayers] = useState<PlayerType[]>(playerDataSet);
  const [formationPositions, setFormationPositions] = useState<AvailablePositions[]>([]);

  const value = useMemo(() => ({
    availablePlayers,
    setAvailablePlayers,
    formationPositions,
    setFormationPositions
  }), [availablePlayers, formationPositions]);

  return (
    <PlayersContext.Provider value={value}>
      {children}
    </PlayersContext.Provider>
  )
}

export default PlayersProvider;

