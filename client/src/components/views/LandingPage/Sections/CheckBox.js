import React, { useState } from 'react';
import { Checkbox, Collapse } from 'antd';
import { CONTINENTS } from './Datas';

const { Panel } = Collapse;

const CheckBox = (props) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    // send to parent component
    props.handleFilters(newChecked);
  };

  const renderCheckboxList = () =>
    CONTINENTS.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          type='checkbox'
          checked={checked.indexOf(value._id) === -1 ? false : true}
        />
        <span>{value.name}</span>
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header='Continents' key='1'>
          {renderCheckboxList()}
        </Panel>
      </Collapse>
    </div>
  );
};

export default CheckBox;
