import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookies'

const FormContainer = styled.div`
  text-align: start;
  width: 600px;
  margin: 12vh auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;


const FormHeader = styled.h2`
  font-size: 1.5rem;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Checkout = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        quantity: '',
        paymentMethod: 'cod',
        address: '',
    });
    const [productDetails, setProductDetails] = useState({})

    const { id } = useParams();

    useEffect(() => {
        // Fetch product data using Axios
        axios.get(`http://localhost:5100/products/${id}`)
            .then((response) => {
                // Assuming that response.data contains the product information
                const productData = response.data;

                // Update the component state with the received product data
                setProductDetails({
                    ...formData,
                    // Assuming that you have fields like name, price, etc. in your product data
                    productName: productData.productname,
                    price: productData.price,
                    // Include other fields as needed
                });
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = Cookies.getItem('userId')
        const price = productDetails.price;
        const productname = productDetails.productname;
        const formDetails = { ...formData, user: userId, productId: id, price, productname }

        try {
            const response = await axios.post('http://localhost:5100/orders', formDetails);
            alert('Order created',response);
            setFormData({
                firstname: '',
                lastname: '',
                phone: '',
                paymentMethod: '', // You can set this to an empty string or a default value
                address: '',
              });
            // Reset the form or perform other actions upon success
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <FormContainer>
            <FormHeader>Order Details</FormHeader>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>First Name:</Label>
                    <Input
                        type="text"
                        name="firstname"
                        placeholder="Enter your first name"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Last Name:</Label>
                    <Input
                        type="text"
                        name="lastname"
                        placeholder="Enter your last name"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Phone:</Label>
                    <Input
                        type="number"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Quantity:</Label>
                    <Input
                        type="text"
                        name="quantity"
                        placeholder="Enter the quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Address:</Label>
                    <textarea
                        type="text"
                        rows={5}
                        style={{ width: '100%' }}
                        name="address"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Payment Method:</Label>
                    <Select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        required
                    >
                        <option value="cod">Cash on Delivery (COD)</option>
                        <option value="credit">Credit Card</option>
                        <option value="debit">Debit Card</option>
                    </Select>
                </FormGroup>


                <Button type="submit">Submit</Button>
            </form>
        </FormContainer>
    );
};

export default Checkout;
