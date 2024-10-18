import React from "react";
import gameDates from "../util/gameDates";

const DateDropdown = (props) => {
	const { chooseDate: chooseDateProp } = props;

	return (
		<>
		<label htmlFor="dates-dropdown">Choose a date:</label>
		<select 
			className="dates-dropdown"
			name="dates-dropdown"
			id="dates-dropdown"
			onChange={(e) => chooseDateProp(e.target.value)}>
			<option className="date-option" value="">--Please choose a date--</option>
			{
				gameDates.map((date) =>
					<option className="date-option"key={date} value={date}>{date}</option>
				)
			}
		</select>
	</>
	);
}

export default DateDropdown;