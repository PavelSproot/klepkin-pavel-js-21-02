import React, { ReactNode, SyntheticEvent, useState } from 'react';
import './Hint.scss';

interface Props {
  element: ReactNode;
  hintText: string;
}

const Hint = function ({ element, hintText }: Props) {
  const [hovered, setHovered] = useState(false);

  const mouseOver = (e: SyntheticEvent) => {
    setHovered(true);
    e.stopPropagation();
  };

  const mouseOut = (e: SyntheticEvent) => {
    setHovered(false);
    e.stopPropagation();
  };

  return (
    <div className="hint-wrapped-element" onMouseOver={mouseOver} onMouseOut={mouseOut}>
      {hovered && <div className="hint-wrapped-element__hint">{hintText}</div>}
      {element}
    </div>
  );
};

export default Hint;
