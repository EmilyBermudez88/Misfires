import playerDataSet from './playerDataSet';
import { PlayerType, UpdateAvailableAction } from '../types/types';

const removePlayer = (playerToRemove: PlayerType, playerArr: PlayerType[]): PlayerType[] => {
  return playerArr.filter((ind) => ind.name !== playerToRemove.name);
};

const addPlayer = (playerToAdd: PlayerType, playerArr: PlayerType[]): PlayerType[] => {
  //player to add may not exist in dataset because they're an extra sub
  const player = playerDataSet.find((player) => player.name === playerToAdd.name) || playerToAdd;
  return playerArr.concat(player);
}

export const updateAvailablePlayers = (
    availablePlayers: PlayerType[],
    ...actions: UpdateAvailableAction[]
  ): PlayerType[] => {

  let result = availablePlayers;

  actions.forEach((update) => update.action === 'remove'
    ? result = removePlayer(update.player, result)
    : result = addPlayer(update.player, result)
  )
  return result;
}

export const calculateButtonClassName = (player: string) =>
  `remove-btn--${player.replace(/\s+/g, '-').toLowerCase()}`