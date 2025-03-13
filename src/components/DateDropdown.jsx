import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';

const JerseyColourDropdown = ({ chooseJersey }) => {
  const [open, setOpen] = useState(false);
  const labelId = 'jersey-labl';
  const dropdownRef = useRef(null);

  const handleBlur=(e) => {
		if (!dropdownRef.current.contains(e.relatedTarget)) {
			setOpen(false)
		}
	}

  const options = [
    { dropdownValue: 'home' },
    { dropdownValue: 'away' }
  ];

	return (
  <div className= "jersey__container">
    <label htmlFor="dropdown" id={labelId}>Home / Away:</label>
    <div className="dropdown formation__select" ref={dropdownRef} onBlur={handleBlur}>
      <Dropdown open={open}
                setOpen={setOpen}
                labelId={labelId}
                options={options}
                className= "formation"
                updateSelected={chooseJersey}
                />
    </div>
  </div>
	);
}

JerseyColourDropdown.propTypes = {
 chooseJersey: PropTypes.func
};

export default JerseyColourDropdown;

// import React from 'react';
// import PropTypes from 'prop-types';
// import gameDates from '../util/gameDates';

// const DateDropdown = (props) => {
// 	const { chooseDate: chooseDateProp } = props;

// 	return (
//     <>
//       <label htmlFor="dates-dropdown">Choose a date:</label>
//       <select className="dates-dropdown"
//               name="dates-dropdown"
//               id="dates-dropdown"
//               onChange={(e) => chooseDateProp(e.target.value)}>
//         <option className="date-option" value="">--Please choose a date--</option>
//         {
//           gameDates.map((date) =>
//             <option className="date-option"key={date} value={date}>{date}</option>
//           )
//         }
//       </select>
//     </>
// 	);
// }

// DateDropdown.propTypes = {
//   chooseDate: PropTypes.func
// };

// export default DateDropdown;