import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookies';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  padding: 20px;
  margin-top: 10vh;
  text-align: start;
`;

const Heading = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
`;

const OrderList = styled.ul`
  list-style: none;
  padding: 0;
`;

const OrderItem = styled.li`
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
`;

const Strong = styled.strong`
  font-weight: bold;
`;

const History = () => {
  const userId = Cookies.getItem('userId');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5100/my-orders/${userId}`)
      .then((response) => {
        // Assuming response.data is an array of orders
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, [userId]); // Include userId in the dependency array to re-fetch orders when it changes

  return (
    <Container>
      <Heading>My History</Heading>
      <OrderList>
        {orders.map((order) => {
          const isDelivered = order.status === 'Delivered' || order.status === 'Canceled';

          return isDelivered ? (
            <OrderItem key={order._id} style={{ border: order.status === 'Delivered' ? '1px solid green' : '1px solid red' }}>
              <Strong>Order ID:</Strong> {order._id} <br />
              <Strong>Name:</Strong> {order.firstname} {order.lastname} <br />
              <Strong>Phone:</Strong> {order.phone} <br />
              <Strong>Date:</Strong> {order.createdAt} <br />
              <Strong>Price:</Strong> {order.price} <br />
              <Strong>Status:</Strong> {order.status} <br />
              <Strong>Payment Method:</Strong> {order.paymentMethod} <br />
            </OrderItem>
          ) : null;
        })}
      </OrderList>
    </Container>
  );
};

export default History;
