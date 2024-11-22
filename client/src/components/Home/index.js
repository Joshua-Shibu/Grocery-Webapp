
import React from 'react';
import { HomeContainer,Container,CenteredRow,ContentColumn,Heading ,Paragraph,PrimaryButton} from "./styledComponents";
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import About from '../About';
import ContactUs from '../Contact';

const Home = () => {
  const onShop = () => {
    // Add your logic for the "Shop Now" button click
    console.log('Shop Now clicked');
  };

  return (
    <div>
      <HomeContainer className="home-container">
      <Container>
        
        <CenteredRow>
          <ContentColumn>
            {/* <Heading>Welcome to Our Flower and Gift Store</Heading> */}
            {/* <Paragraph>Discover a wide range of Flowers and Gifts for all your needs</Paragraph> */}
            <PrimaryButton> <Link to='/shopping' style={{textDecoration:'none',color:'white',fontWeight:'bolder'}}>Shop Now</Link> </PrimaryButton>
          </ContentColumn>
        </CenteredRow>
      </Container>
    </HomeContainer>
    <About/>
    <ContactUs/>
    <Footer/>
    </div>
  );
}

export default Home;
