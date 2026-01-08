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

export type AvailablePositions = GoaliePositions | DefensePositions | MidfieldPositions | AttackPositions;

export interface PitchPositions {
    goalie: GoaliePositions[];
    defense: DefensePositions[];
    midfield: MidfieldPositions[];
    attack: AttackPositions[];
}

export interface UpdateAvailableAction {
  action: 'add' | 'remove';
  player: PlayerType;
}

export type JerseyColourType = 'home' | 'away';