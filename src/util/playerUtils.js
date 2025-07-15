import playerDataSet from './playerDataSet';

export const updateAvailablePlayers = (availablePlayers, ...actions) => {
    let result = availablePlayers;

    const removePlayer = (playerToRemove, playerArr) =>
      result = playerArr.filter((ind) => ind.name !== playerToRemove.name);

      const addPlayer = (playerToAdd, playerArr) => {
      //player to add may not exist in dataset because they're an extra sub
      const playerFromRoster = playerDataSet.find((player) => player.name === playerToAdd.name);
      const playerInfo = playerFromRoster ? playerFromRoster : playerToAdd;
      return result = playerArr.concat(playerInfo);
    }

    actions.forEach((update) => update.action === 'remove'
      ? removePlayer(update.player, result)
      : addPlayer(update.player, result)
    )
    return result;
  }