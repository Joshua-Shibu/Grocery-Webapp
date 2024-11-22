import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
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

const AddCategory = () => {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
  });

  const { category, description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!category) {
        // You can implement client-side validation here if needed
        return alert('Category is required');
      }

      const response = await axios.post('http://localhost:5100/add-category', {
        category,
        description,
      });

      console.log('Category added:', response.data);

      // Optionally, you can clear the form fields here
      setFormData({
        category: '',
        description: '',
      });

      // Handle any other actions upon successful category addition

    } catch (error) {
      console.error('Error adding category:', error);
      // Handle errors here, e.g., show an error message to the user
    }
  };

  return (
    <Container>
      <Heading>Add Category</Heading>
      <Form onSubmit={handleSubmit} className='shadow p-3'>
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
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </FormGroup>
        <Button type="submit">Add Category</Button>
      </Form>
    </Container>
  );
};

export default AddCategory;
