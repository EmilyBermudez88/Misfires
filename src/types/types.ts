export interface PlayerType {
    name: string;
    position: AvailablePositions[];
    backupPosition?: AvailablePositions;
    sub?: boolean;
}

export type LineType = 'goalie' | 'defense' | 'midfield' | 'attack';

type GoaliePositions = 'GK';
type DefensePositions = 'RB' | 'CB' | 'LB';
type MidfieldPositions = 'RW' | 'CM' | 'LW';
type AttackPositions = 'CF';

interface LineToPositionMap {
    goalie: GoaliePositions;
    defense: DefensePositions;
    midfield: MidfieldPositions;
    attack: AttackPositions;
}

export type PitchPositions = {
    [K in LineType]: LineToPositionMap[K][];
}

export type AvailablePositions = LineToPositionMap[LineType];


export interface UpdateAvailableAction {
  action: 'add' | 'remove';
  player: PlayerType;
}

export type JerseyColourType = 'home' | 'away';