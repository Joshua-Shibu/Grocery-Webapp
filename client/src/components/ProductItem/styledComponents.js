import styled from 'styled-components';

export const ProductContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;  
  padding: 10px;
  margin-bottom: 15px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ProductName = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 2px;
  margin-top:10px;
`;

export const ProductDescription = styled.p`
  color: #555;
  margin-bottom: 10px;
`;

export const ProductPrice = styled.p`
  font-weight: bold;
  color: #22aaff;
`;

export const ProductImage = styled.img`
  max-width: 100%;
  height: 260px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  background-color: lightgreen;
  color: white;
  border: none;
  // border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: green;
  }
`;