import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookies";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {CiCircleRemove} from 'react-icons/ci'

// Styled components
const CartContainer = styled.div`
  max-width: 100%;
  margin: 10vh auto;
  padding: 20px;
  text-align:start;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
`;

const ProductImage = styled.img`
  width: 120px;
  height: 120px;
  margin-right: 10px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const ProductPrice = styled.p`
  font-size: 14px;
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
`;


const MyCart = () => {
  const userId = Cookies.getItem("userId");
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    getProductsList()
  }, []);

  const getProductsList = () => {
    axios
      .get(`http://localhost:5100/cart/${userId}`)
      .then((response) => {
        setCartData(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }

  const handleCancelClick = (productId) => {
    // Send a DELETE request to remove the product from the cart
    axios
      .delete(`http://localhost:5100/remove-from-cart/${productId}`)
      .then((response) => {
        setCartData((prevCartData) =>
          prevCartData.filter((item) => item.productId !== productId)
        );
        getProductsList()
      })
      .catch((error) => {
        console.error("Error removing product from cart:", error);
      });
  };

  return (
    <CartContainer>
      <h2>My Cart</h2>
      {cartData.map((item) => (
        <CartItem key={item._id}>
          <ProductImage src={item.image} alt="Product" />
          <ProductInfo>
            <ProductName>{item.productname}</ProductName>
            <ProductPrice>Price: ${item.price}</ProductPrice>
            <Link to={`/order-details/${item._id}`} className='btn btn-primary'>Buy this</Link>
          </ProductInfo>
          <ActionButtons>
            <button className="btn" title="Remove" onClick={() => handleCancelClick(item._id)}>
              <CiCircleRemove/>
            </button>
          </ActionButtons>
        </CartItem>
      ))}
    </CartContainer>
  );
};

export default MyCart;
