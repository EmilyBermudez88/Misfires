import React, { useContext } from 'react';
import classnames from 'classnames';

import PlayerPositions from './PlayerPositions';
import FieldLayout from '../assets/fieldLayout.png';

import { positions } from '../utils/lineupData';
import { PlayersContext } from '../contexts/PlayersContext';
import { FormationContext } from '../contexts/FormationContext';
import { LineType, renderSubFormType } from '../types/types';

interface FieldProps {
	renderSubForm: renderSubFormType;
}

const Field = ({ renderSubForm }: FieldProps) => {
	const { formationPositions, setFormationPositions } = useContext(PlayersContext);
	const { formation } = useContext(FormationContext);
	const fieldLineClassNames = classnames('field__line', {
    spread: formation.length < 4
  });

	const definePosition = (line: LineType, idx: number) => {
		const positionName = positions[line][idx];
		if (!formationPositions.includes(positionName)) {
			formationPositions.push(positionName);
		}
		return positionName;

	}

	const renderGoalie = (num: number): React.JSX.Element[] => {
		const children= []
		for (let i = 0; i < num; i++) {
      const goalie = definePosition('goalie', i);
      children.push(<PlayerPositions key="goalie"
                                     position={goalie}
                                     renderSubForm={renderSubForm}/>);
		}
		return children;
	}

	const renderDefense = (num: number): React.JSX.Element[] => {
		const children = []
		if (num === 3) {
      for (let i = 0; i < num; i++) {
        const defense = definePosition('defense', i);
				children.push(<PlayerPositions key={`defense-${i}`}
                                   position={defense}
                                   renderSubForm={renderSubForm}/>);
			}
		} else {
      for (let i = 0; i < num; i++) {
        const defense = definePosition('defense', 1);
        children.push(<PlayerPositions key={`defense-${i}`}
                                       position={defense}
                                       renderSubForm={renderSubForm}/>);
      }
    }
		return children;
	}
	const renderMidfield = (num: number): React.JSX.Element[] => {
		const children = []
		if (num === 1) {
      const midfield = definePosition('midfield', num);
			children.push(<PlayerPositions key="midfield"
                                  position={midfield}
                                  renderSubForm={renderSubForm}/>);
		}
		else if (num === 2) {
			for (let i = 0; i <= num; i = i + 2) {
        const midfield = definePosition('midfield', i);
				children.push(<PlayerPositions key={`midfield-${i}`}
                                   position={midfield}
                                   renderSubForm={renderSubForm}/>);
			}
		}
		else {
			for (let i = 0; i < num; i++) {
        const midfield = definePosition('midfield', i);
				children.push(<PlayerPositions key={`midfield-${i}`}
                                   position={midfield}
                                   renderSubForm={renderSubForm}/>);
			}
		}
		return children;
	}

	const renderAttack = (num: number): React.JSX.Element[] => {
		const children = []
		for (let i = 0; i < num; i++) {
      const attack = definePosition('attack', i);
			children.push(<PlayerPositions key={`attack-${i}`}
                                  position={attack}
                                  renderSubForm={renderSubForm}/>);
		}
		return children;
	}

	return (
		<div className="field">
			<img className="field__image" src={FieldLayout}/>
			<div className="field__setup">
				{ !!formation.length &&
					<>
						<div className={fieldLineClassNames}>{renderGoalie(formation[0])}</div>
						<div className={fieldLineClassNames}>{renderDefense(formation[1])}</div>
						<div className={fieldLineClassNames}>{renderMidfield(formation[2])}</div>
						<div className={fieldLineClassNames}>{renderAttack(formation[3])}</div>
					</>
					}
			</div>
		</div>
	)
}

export default Field;