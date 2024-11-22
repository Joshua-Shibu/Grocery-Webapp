import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px 0;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

export const FooterText = styled.p`
  font-size: 14px;
  margin: 0;
`;

export const FooterLinks = styled.div`
  margin-top: 10px;
`;

export const FooterLink = styled.a`
  color: #fff;
  margin: 0 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;