import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
const animatedComponents = makeAnimated();

export default function AnimatedMulti() {
   const onSelectChange=(v)=>{
    console.log(v);
    }
  return (
    <Select
    onChange={onSelectChange}
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={[options[4], options[5]]}
      isMulti
      options={options}
    />
  );
}