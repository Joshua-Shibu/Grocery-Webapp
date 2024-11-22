import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  background-color: #f7f7f7;
  padding: 40px 0;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const About = () => {
    return (
        <AboutContainer>
            <div className='container shadow p-4'>
                <Heading>About Us</Heading>
                <Paragraph>
                    Welcome to GroceryMart - your one-stop destination for fresh and
                    quality groceries. We are dedicated to providing you with the finest
                    selection of products to make your shopping experience convenient and
                    enjoyable.
                </Paragraph>
                <Paragraph>
                    Our journey began in 2005, and since then, we've been committed to
                    serving our customers with the freshest produce, pantry essentials,
                    and more. With a passion for quality and customer satisfaction, we
                    ensure that every item you find on our shelves meets the highest
                    standards.
                </Paragraph>
                <Paragraph>
                    Whether you're looking for everyday groceries, special ingredients for
                    your favorite recipes, or unique items for a special occasion, we've
                    got you covered. Shop with us and experience the joy of quality
                    groceries at your doorstep.
                </Paragraph>
            </div>
        </AboutContainer>
    );
};

export default About;
