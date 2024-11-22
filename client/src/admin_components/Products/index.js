import React, { useState, useEffect } from 'react';
import styled from 'styled-components'; 
import ProductItem from '../ProductItem'
import Cookies from 'js-cookies'
import axios from 'axios';

const ProductsContainer = styled.div`
  margin-top: 4vh;
  padding:20px;
  text-align:start;
`;

const Heading = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  margin-top:40px;
`;

const StyledList = styled.ul`
  list-style: none;
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
  max-width:270px;
`;

const AdminProducts = () => {
  const api = 'http://localhost:5100/products';
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData()
  }, []);

  const getData = () => {
    fetch(api)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }

  const handleDeleteProduct = async (id) => {
    const userId = Cookies.getItem("userId"); 
    try {
      const response = await axios.delete(`http://localhost:5100/products/${id}`);
      getData()
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <ProductsContainer>
      <Heading>Products</Heading>
      <StyledList>
        {products.map(product => (
          <ListItem key={product._id}>
            <ProductItem
            id={product._id}
              img={product.image}
              name={product.productname}
              description={product.description}
              price={product.price}
              handleDeleteProduct={handleDeleteProduct}
            />
          </ListItem>
        ))}
      </StyledList>
    </ProductsContainer>
  );
};

export default AdminProducts;
