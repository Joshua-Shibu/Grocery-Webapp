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

const AdminProductItem = ({ id, name, description, price, img ,handleDeleteProduct}) => {

  const handleDelete = async () => {
    handleDeleteProduct(id)
  };

  return (
    <ProductContainer>
      <ProductImage src={img} alt={name} />
      <ProductName>{name}</ProductName>
      <ProductPrice>${price}</ProductPrice>
      <ButtonContainer>
        <Link to={`/admin/product-update/${id}`}  className='btn btn-primary'>Update</Link>
        <Button onClick={handleDelete} className='btn btn-danger' >Delete</Button>
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

export default AdminProductItem;
