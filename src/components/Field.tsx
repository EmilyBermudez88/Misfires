import React, { useContext, useEffect, useMemo } from 'react';
import classnames from 'classnames';

import PlayerPositions from './PlayerPositions';
import FieldLayout from '../assets/fieldLayout.png';

import { positions } from '../utils/lineupData';
import { PlayersContext } from '../contexts/PlayersContext';
import { FormationContext } from '../contexts/FormationContext';
import { AvailablePositions, LineType, renderSubFormType } from '../types/types';

interface FieldProps {
  renderSubForm: renderSubFormType;
}

const Field = ({ renderSubForm }: FieldProps) => {
  const { formation } = useContext(FormationContext);
  const { setFormationPositions } = useContext(PlayersContext);
  const fieldLineClassNames = classnames('field__line', {
    spread: formation.length < 4
  });

  const getPosition = (line: LineType, count: number, idx: number): AvailablePositions => {
    const linePositions = positions[line];
    if (line === 'defense') {
      if (count === 2) {
        return linePositions[1];
      }
      return linePositions[idx];
    }
    if (line === 'midfield') {
      if (count === 1) {
        return linePositions[1];
      } else if (count === 2) {
        return idx === 0 ? linePositions[0] : linePositions[2];
      } else {
        return linePositions[idx];
      }
    }
    return linePositions[0]
  }

  const fieldLayout = useMemo(() => {
    const lines: LineType[] = ['goalie', 'defense', 'midfield', 'attack'];

    return lines.map((line, lineIdx) => {
      const count = formation[lineIdx] || 0;
      const positionsInLine: AvailablePositions[] = [];

      for (let i = 0; i < count; i++) {
        positionsInLine.push(getPosition(line, count, i));
      }

      return positionsInLine;
    });
  }, [formation]);

  useEffect(() => {
    if (formation.length > 0) {
      const allActivePositions = fieldLayout.flat();
      setFormationPositions([...new Set(allActivePositions)]);

    } else {
      setFormationPositions([]);
    }
  }, [formation]);

  return (
    <div className="field">
      <img className="field__image" src={FieldLayout}/>
      <div className="field__setup">
        { !!formation.length && fieldLayout.map((positions, lineIdx) => (
          <div key={`line-${lineIdx}`} className={fieldLineClassNames}>
            {positions.map((pos, idx) => (
              <PlayerPositions key={`pos-${lineIdx}-${idx}`}
                               position={pos}
                               renderSubForm={renderSubForm}/>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Field;