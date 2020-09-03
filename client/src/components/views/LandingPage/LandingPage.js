import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon, Row, Col, Card } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';
import { PRICE } from './Sections/Datas';

const { Meta } = Card;

const LandingPage = (props) => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const [filters, setFilters] = useState({
    continents: [],
    price: []
  });

  useEffect(() => {
    const variables = {
      skip: skip,
      limit: limit
    };

    getProducts(variables);
  }, []);

  const getProducts = (variables) => {
    axios.post('/api/product/getProducts', variables).then((response) => {
      if (response.data.success) {
        if (variables.loadMore) {
          setProducts([...products].concat(response.data.products));
          // setProducts([...products, response.data.products]);
        } else {
          setProducts(response.data.products);
        }
        setPostSize(response.data.postSize);
      } else {
        alert('Failed to fetch product data');
      }
    });
  };

  const renderCards = products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card hoverable={true} cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const onLoadMore = () => {
    let newSkip = skip + limit;

    const variables = {
      skip: newSkip,
      limit: limit,
      loadMore: true
    };

    getProducts(variables);

    setSkip(newSkip);
  };

  const showFilteredResults = (newFilters) => {
    const variables = {
      skip: 0,
      limit: limit,
      filters: newFilters
    };

    getProducts(variables);

    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = PRICE;
    let array = [];

    array = data.find((el) => el._id === parseInt(value)).array;

    // for (let key in data) {
    //   if (data[key]._id === parseInt(value, 10)) {
    //     array = data[key].array;
    //   }
    // }
    console.log(array);
    return array;
  };

  const handleFilters = (checkedFilters, category) => {
    const newFilters = { ...filters };
    newFilters[category] = checkedFilters;

    if (category === 'price') {
      let priceValues = handlePrice(checkedFilters);
      newFilters[category] = priceValues;
    }
    console.log(newFilters);

    showFilteredResults(newFilters);

    setFilters(newFilters);
  };

  const updateSearchTerm = (newSearchTerm) => {
    const variables = {
      skip: 0,
      limit: limit,
      filters: filters,
      searchTerm: newSearchTerm
    };

    setSkip(0);
    setSearchTerm(newSearchTerm);
    console.log(newSearchTerm);

    getProducts(variables);
  };

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textalign: 'center' }}>
        <h2>
          Let's travel anywhere! <Icon type='rocket' />
        </h2>
      </div>

      {/* Filter */}

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <CheckBox
            handleFilters={(checkedFilters) =>
              handleFilters(checkedFilters, 'continents')
            }
          />
        </Col>
        <Col lg={12} xs={24}>
          <RadioBox
            handleFilters={(checkedFilters) =>
              handleFilters(checkedFilters, 'price')
            }
          />
        </Col>
      </Row>

      {/* Search */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '1rem auto'
        }}>
        <SearchFeature refreshFunction={updateSearchTerm} />
      </div>

      {products.length === 0 ? (
        <div
          style={{
            display: 'flex',
            height: '300px',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <h2>No posts yet...</h2>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>{renderCards}</Row>
        </div>
      )}
      <br></br>

      {postSize >= limit && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={onLoadMore}>Load more</button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
