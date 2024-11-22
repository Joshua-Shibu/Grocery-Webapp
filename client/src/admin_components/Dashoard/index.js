import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './style.css'; // Import your custom CSS for styling
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState({
    products: 0,
    users: 0,
    orders: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, productsResponse, ordersResponse] = await Promise.all([
          axios.get('http://localhost:5100/users'),
          axios.get('http://localhost:5100/products'),
          axios.get('http://localhost:5100/orders'),
        ]);

        setData({
          users: usersResponse.data.length,
          products: productsResponse.data.length,
          orders: ordersResponse.data.length,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard container">
      <h2>Dashboard</h2>

      <div className="card-container">
        <Card>
          <Card.Body>
            <Card.Title>Product Count</Card.Title>
            <Card.Text>{data.products} Products</Card.Text>
            <Link style={{textDecoration:'none',color:'white'}} to={'/admin/all-products'}><Button variant="primary">View Products </Button></Link>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>User Count</Card.Title>
            <Card.Text>{data.users} Users</Card.Text>
            <Link style={{textDecoration:'none',color:'white'}} to={'/admin/users'}><Button variant="primary">View Users </Button></Link>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>Order Count</Card.Title>
            <Card.Text>{data.orders} Orders</Card.Text>
            <Link style={{textDecoration:'none',color:'white'}} to="/admin/orders"><Button variant="primary">View Orders</Button></Link>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>Add Product</Card.Title>
            <Link style={{textDecoration:'none',color:'white'}} to='/admin/add-product'><Button style={{width:'100px'}} variant="success">Add </Button></Link>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>Add Category</Card.Title>
            <Link style={{textDecoration:'none',color:'white',}} to='/admin/add-category'><Button style={{width:'100px'}} variant="success">Add </Button></Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
