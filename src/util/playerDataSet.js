import gameDates from './gameDates';

const players = [
	{
		name: 'Emily',
		gender: 'F',
		position: 'right back',
		secondPosition: 'left back',
		thirdPosition: '',
		availability: [...gameDates]
	},
	{
		name: 'German',
		gender: 'M',
		position: 'left winger',
		secondPosition: 'left back',
		thirdPosition: 'centre back',
		availability: gameDates.slice(0, -1)
	},
	{
		name: 'Andrew',
		gender: 'M',
		position: 'centreback',
		secondPosition: 'goalie',
		thirdPosition: 'left back',
		availability: [...gameDates]
	},
	{
		name: 'Rakhee',
		gender: 'F',
		position: 'striker',
		secondPosition: 'left back',
		thirdPosition: 'right back',
		availability: [...gameDates]
	},
	{
		name: 'Omar',
		gender: 'M',
		position: 'midfield',
		secondPosition: 'left winger',
		thirdPosition: 'right winger',
		availability: [...gameDates]
	},
	{
		name: 'Chris',
		gender: 'F',
		position: 'midfield',
		secondPosition: 'right winger',
		thirdPosition: 'right back',
		availability: [...gameDates]
	},
	{
		name: 'Christian',
		gender: 'M',
		position: 'striker',
		secondPosition: 'right winger',
		thirdPosition: '',
		availability: [...gameDates]
	},
	{
		name: 'Bogdan',
		gender: 'M',
		position: 'centre back',
		secondPosition: 'left back',
		thirdPosition: 'midfield',
		availability: [...gameDates]
	},
	{
		name: 'Nuno',
		gender: 'M',
		position: 'goalie',
		secondPosition: '',
		thirdPosition: '',
		availability: [...gameDates]
	}
];

export default players;