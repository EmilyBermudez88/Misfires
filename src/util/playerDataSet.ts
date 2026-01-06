export interface PlayerType {
	name: string;
	position: string[];
	backupPosition?: string;
	sub?: boolean;
}

const playerDataSet = [
	{
		name: 'German',
		position: ['LB', 'RB', 'CB'],
		backupPosition: undefined
	},
	{
		name: 'Andrew',
		position: ['GK', 'CB'],
		backupPosition: undefined
	},
	{
		name: 'Omar',
		position: ['CM', 'RW'],
		backupPosition: 'LW'
	},
	{
		name: 'Chris',
		position: ['CM', 'LW'],
		backupPosition: 'CF'
	},
	{
		name: 'Christian',
		position: ['RW', 'CF'],
		backupPosition: 'CM'
	},
	{
		name: 'Bogdan',
		position: ['CB', 'LB'],
		backupPosition: 'LW'
	},
	{
		name: 'Alex',
		position:['LW', 'LB'],
		backupPosition: 'CF'
	},
	{
		name: 'Carlos',
		position: ['LW', 'LB'],
		backupPosition: 'CF'
	},
	{
		name: 'Ratsel',
		position:['CF', 'RW'],
		backupPosition: 'LW'
	},
	{
		name: 'Adrian',
		position: ['CB', 'LW'],
		backupPosition: 'CF'
	},
	{
		name: 'Daniel',
		position: ['CB', 'LB'],
		backupPosition: 'LW'
	},
	{
		name: 'John',
		position: ['RB', 'CB'],
		backupPosition: 'RW'
	},
	{
		name: 'Josh',
		position: ['CM', 'LW'],
		backupPosition: 'RW'
	},
	{
		name: 'Nicolas',
		position: ['CB', 'LB'],
		backupPosition: 'LW'
	},
	{
		name: 'Julian',
		position: ['CF', 'RW'],
		backupPosition: 'GK'
	},
	{
		name: 'Sanjay',
		position: ['LW', 'CM'],
		backupPosition: 'CF'
	},
  {
    name: 'Liam',
    position: ['GK'],
    backupPosition: undefined
  }
];

export default playerDataSet;