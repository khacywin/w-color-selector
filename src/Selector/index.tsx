import React, { useEffect, useState } from 'react';
import { WColor, WColorAdd, WColorHeading } from './style';

import ColorPicker from './_ColorPicker';
import Container from './_Container';
import _t from './../util/_t';
import icon_add from './../icons/add.svg';

interface Props {
  select?: string;
  fnSelected: (color: string) => void;
  fnClosePopup: () => void;
}

export default React.memo((props: Props) => {
  const [hex, setHex] = useState('#866969');
  const template = [
    '#54478c',
    '#2c699a',
    '#048ba8',
    '#0db39e',
    '#16db93',
    '#83e377',
    '#b9e769',
    '#efea5a',
    '#f1c453',
    '#f29e4c',
  ];
  const [colour, setColour] = useState<any[]>([]);
  const [value, setValue] = useState(props.select || '#54478c');

  useEffect(() => {
    let _colour = [];
    if (localStorage.getItem('colour')) {
      _colour = _colour.concat(localStorage.getItem('colour').split(','));
    }
    setColour(_colour);
  }, []);

  useEffect(() => {
    props.fnSelected(value);
  }, [value]);

  function addToLocalStorage(color: string) {
    if (localStorage.getItem('colour')) {
      let _colour = localStorage.getItem('colour');
      localStorage.setItem('colour', _colour.concat(',', color));
    } else {
      localStorage.setItem('colour', color);
    }
  }

  function addColour(color: string) {
    if (template.indexOf(color) < 0 && colour.indexOf(color) < 0) {
      let _colour: any[] = [...colour, color];
      setColour(_colour);
      addToLocalStorage(color);
    }
  }

  function removeInLocalStorage(color: string) {
    let _colour = localStorage.getItem('colour');
    _colour = _colour.replace(color, '').replace(/(,,)/, ',');
    _colour = _colour[0] === ',' ? _colour.slice(1, _colour.length) : _colour;
    _colour =
      _colour[_colour.length - 1] === ','
        ? _colour.slice(0, _colour.length - 1)
        : _colour;

    localStorage.setItem('colour', _colour);
  }

  function removeColour(color: string) {
    let _colour: string[] = [...colour].filter(
      (item: string) => item !== color
    );
    setColour(_colour);
    setValue('#54478c');
    removeInLocalStorage(color);
  }

  function selectColor(color: string) {
    setValue(color);
    props.fnSelected(color);
    props.fnClosePopup();
  }

  return (
    <WColor>
      {/**
       ** Wrap color picker
       */}
      <ColorPicker hex={(color: string) => setHex(color)} />
      <WColorHeading>
        {_t('Recent')}
        <WColorAdd type='button' onClick={() => addColour(hex)}>
          <img src={icon_add} alt='w-color' />
        </WColorAdd>
      </WColorHeading>
      <Container
        colour={[...template, ...colour]}
        select={value}
        fnSelected={selectColor}
        fnRemove={removeColour}
      />
    </WColor>
  );
});
