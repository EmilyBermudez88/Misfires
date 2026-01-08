import { PitchPositions } from '../types/types';

export const formations = [
    '1 - 2 - 3 - 1',
    '1 - 2 - 2 - 2',
    '1 - 2 - 1 - 3',
    '1 - 3 - 1 - 2',
    '1 - 3 - 2 - 1',
    '1 - 3 - 3'
] as const;

export const positions: PitchPositions = {
    goalie: ['GK'], //goalkeeper
    defense: ['RB', 'CB', 'LB'], //standard shortform for right/left/centre backs
    midfield: ['RW', 'CM', 'LW'], //right winter, centre midfield, left winter
    attack: ['CF', 'CF', 'CF'] //centre forward / striker
}
