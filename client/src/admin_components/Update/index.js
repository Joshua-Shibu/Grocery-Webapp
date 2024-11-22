import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams to get the product ID from the URL
import styled from 'styled-components';

// Styled components (you can adjust styles as needed)
const Container = styled.div`
  max-width: 800px;
  margin: 10vh auto;
  padding: 20px;
  text-align: start;
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: rgb(62, 62, 62);
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  min-height: 100px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: rgb(98, 90, 252);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

const UpdateProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL

  const [formData, setFormData] = useState({
    productname: '',
    description: '',
    price: '',
    image: '',
    category: '',
    countInStock: '',
    rating: '',
  });

  const navigate = useNavigate()

  useEffect(() => {
    // Fetch the existing product data
    axios.get(`http://localhost:5100/products/${id}`)
      .then((response) => {
        // Populate the form with the existing product data
        setFormData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [id]);

  const { productname, description, price, image, category, countInStock, rating } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5100/products/${id}`, formData);

      console.log('Product updated:', response.data);
      navigate('/admin/all-products')

      // Handle any other actions upon successful product update

    } catch (error) {
      console.error('Error updating product:', error);
      // Handle errors here, e.g., show an error message to the user
    }
  };

  return (
    <Container>
      <Heading>Update Product</Heading>
      <Form onSubmit={handleSubmit} className='shadow p-3'>
        {/* Render form fields with existing data */}
        <FormGroup>
          <Label htmlFor="productname">Product Name</Label>
          <Input
            type="text"
            name="productname"
            value={productname}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="rating">Rating</Label>
          <Input
            type="number"
            name="rating"
            value={rating}
            onChange={handleChange}
            placeholder="Enter product rating"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            name="price"
            value={price}
            onChange={handleChange}
            placeholder="Enter product price"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="image">Image URL</Label>
          <Input
            type="text"
            name="image"
            value={image}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="category">Category</Label>
          <Input
            type="text"
            name="category"
            value={category}
            onChange={handleChange}
            placeholder="Enter category"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="countInStock">Count in Stock</Label>
          <Input
            type="number"
            name="countInStock"
            value={countInStock}
            onChange={handleChange}
            placeholder="Enter count in stock"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Enter product description"
          />
        </FormGroup>
        <Button type="submit">Update Product</Button>
      </Form>
    </Container>
  );
};

export default UpdateProduct;
