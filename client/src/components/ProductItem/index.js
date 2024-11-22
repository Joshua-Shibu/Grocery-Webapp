import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookies'
import {
  ProductContainer,
  ProductName,
  ProductDescription,
  ProductPrice,
  ProductImage,
  Button,
  ButtonContainer,
} from "./styledComponents";

const ProductItem = ({ id, name, description, price, img }) => {

  const handleAddToCart = async () => {
    const userId = Cookies.getItem("userId"); // Get the user ID from cookies or your authentication system

    try {
      const response = await axios.post("http://localhost:5100/add-to-cart", {
        userId,
        productId: id,
      });

      // Handle success here, you can show a success message or update the UI.
      alert('Product Added to cart!');
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Handle error here, show an error message or log it.
    }
  };

  return (
    <ProductContainer>
      <ProductImage src={img} alt={name} />
      <ProductName>{name}</ProductName>
      <ProductPrice>${price}</ProductPrice>
      <ButtonContainer>
        <Link to={`/order-details/${id}`} className="btn btn-primary" style={{borderRadius:'0'}}>Buy Now</Link>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </ButtonContainer>
      {/* <div>
        <label>Quantity: </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div> */}
    </ProductContainer>
  );
};

export default ProductItem;
