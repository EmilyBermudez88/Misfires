export const formations = [
    { dropdownValue: '1 - 2 - 3 - 1' },
    { dropdownValue: '1 - 2 - 2 - 2' },
    { dropdownValue: '1 - 2 - 1 - 3' },
    { dropdownValue: '1 - 3 - 1 - 2' },
    { dropdownValue: '1 - 3 - 2 - 1' },
    { dropdownValue: '1 - 3 - 3' }
];

export type LineType = 'goalie' | 'defense' | 'midfield' | 'attack';

type GoaliePositions = 'GK';
type DefensePositions = 'RB' | 'CB' | 'LB';
type MidfieldPositions = 'RW' | 'CM' | 'LW';
type AttackPositions = 'CF';

export type AvailablePositions = GoaliePositions | DefensePositions | MidfieldPositions | AttackPositions;

interface PitchPositions {
    goalie: GoaliePositions[];
    defense: DefensePositions[];
    midfield: MidfieldPositions[];
    attack: AttackPositions[];
}

export const positions: PitchPositions = {
    goalie: ['GK'], //goalkeeper
    defense: ['RB', 'CB', 'LB'], //standard shortform for right/left/centre backs
    midfield: ['RW', 'CM', 'LW'], //right winter, centre midfield, left winter
    attack: ['CF', 'CF', 'CF'] //centre forward / striker
}
