import React, { useState } from 'react';
import { Collapse, Radio } from 'antd';
import { PRICE } from './Datas';

const { Panel } = Collapse;

const RadioBox = (props) => {
  const [value, setValue] = useState('0');

  const renderRadioBox = () => {
    return PRICE.map((value) => (
      <Radio key={value._id} value={`${value._id}`}>
        {value.name}
      </Radio>
    ));
  };

  const handleChange = (event) => {
    setValue(event.target.value);

    props.handleFilters(event.target.value);
  };

  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header='Price' key='1'>
          <Radio.Group onChange={handleChange} value={value}>
            {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
};

export default RadioBox;
