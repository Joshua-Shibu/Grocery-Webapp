import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  background-color: #fff;
  padding: 40px 0;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const ContactInfo = styled.div`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const ContactUs = () => {
  return (
    <ContactContainer>
      <div className='container shadow p-4'>
      <Heading>Contact Us</Heading>
      <ContactInfo>
        <p>
          Thank you for considering GroceryMart! If you have any questions or
          need assistance, please don't hesitate to get in touch with us.
        </p>
        <p>
          <strong>Email:</strong> info@grocerymart.com
        </p>
        <p>
          <strong>Phone:</strong> +1 (123) 456-7890
        </p>
      </ContactInfo>
      </div>
    </ContactContainer>
  );
};

export default ContactUs;
