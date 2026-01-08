import playerDataSet from './playerDataSet';
import { AvailablePositions, PlayerType, UpdateAvailableAction } from '../types/types';

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

export const calculateDropdownOptions = (availablePlayers: PlayerType[], position: AvailablePositions) => {
  // We still want to parse the availablePlayers array into preferred positions to
  // make the choice easier of which player should go where
  const preferred = availablePlayers.filter(p => p.position.includes(position));
  if (preferred.length > 0) {
    return preferred.map(p => p.name);
  }

  // If no preferred players exist, render backup options
  return availablePlayers
    .filter(p => p.backupPosition?.includes(position))
    .map(p => p.name);
}

export const calculateButtonClassName = (player: string) =>
  `remove-btn--${player.replace(/\s+/g, '-').toLowerCase()}`