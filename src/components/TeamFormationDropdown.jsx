import React from "react";
import formations from "../util/formations";

const TeamFormationDropdown = (props) => {
	const { chooseFormation: chooseFormationProp } = props;

	return (
		<>
		<label htmlFor="formation-dropdown">Choose a formation:</label>
		<select 
			className="formation-dropdown"
			name="formation-dropdown"
			id="formation-dropdown"
			onChange={(e) => chooseFormationProp(e.target.value)}>
			<option className="layout-option" value="">--Please choose a Formation--</option>
			{
				formations.map((layout) => 
					<option className="layout-option" value={layout}>{layout}</option>)
			}
		</select>
	</>
	);
}

export default TeamFormationDropdown;