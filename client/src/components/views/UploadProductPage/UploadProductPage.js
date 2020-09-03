import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import axios from 'axios';

import FileUpload from '../../utils/FileUpload';

const { Title } = Typography;
const { TextArea } = Input;

const CONTINENTS = [
  { key: 1, value: 'Africa' },
  { key: 2, value: 'Europe' },
  { key: 3, value: 'Asia' },
  { key: 4, value: 'North America' },
  { key: 5, value: 'South America' },
  { key: 6, value: 'Australia' },
  { key: 7, value: 'Antarctica' }
];

const UploadProductPage = (props) => {
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [priceValue, setPriceValue] = useState(0);
  const [continentValue, setContinentValue] = useState(1);
  const [images, setImages] = useState([]);

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onPriceChange = (event) => {
    setPriceValue(event.currentTarget.value);
  };

  const onContinentSelectChange = (event) => {
    setContinentValue(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (
      !titleValue ||
      !descriptionValue ||
      !priceValue ||
      !continentValue ||
      !images.length === 0
    ) {
      return alert('Fill in all fields to submit');
    }

    const variables = {
      writer: props.user.userData._id,
      title: titleValue,
      description: descriptionValue,
      price: priceValue,
      images: images,
      continents: continentValue
    };

    axios.post('/api/product/uploadProduct', variables).then((response) => {
      if (response.data.success) {
        alert('Product successfully uploaded');
        props.history.push('/');
      } else {
        alert('Failed to upload product');
      }
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Travel Product</Title>
      </div>
      <Form onSubmit={onSubmit}>
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={titleValue} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={descriptionValue} />
        <br />
        <br />
        <label>Price ($)</label>
        <Input onChange={onPriceChange} value={priceValue} type='number' />
        <select onChange={onContinentSelectChange}>
          {CONTINENTS.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
};

export default UploadProductPage;
