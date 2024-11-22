import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductItem from '../ProductItem';

const ProductsContainer = styled.div`
  margin-top: 10vh;
  padding: 20px;
  text-align: start;
`;

const Heading = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  margin-top: 40px;
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
  max-width: 270px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const CategoryFilter = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const FiltersContainer = styled.div`
  display:flex;
  align-items:center;
  gap:30px;
  margin-top:30px;
  @media and (max-width:768px){
    flex-direction:column;
  }
`

const Products = () => {
  const api = 'http://localhost:5100/products';
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // State for selected category

  useEffect(() => {
    // Fetch products from the API and update the state
    fetch(api)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Function to handle changes in the search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle changes in the category filter
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Function to filter products based on the selected category and search query
  const filteredProducts = products.filter((product) => {
    const productNameMatchesSearch =
      product.productname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      searchQuery.trim() === '';

    if (selectedCategory === 'all') {
      return productNameMatchesSearch;
    } else {
      return (
        productNameMatchesSearch && product.category.toLowerCase() === selectedCategory
      );
    }
  });

  // Get unique category values from products
  const categories = [
    ...new Set(products.map((product) => product.category.toLowerCase())),
  ];

  // Add 'All' as an option to select all categories
  categories.unshift('all');

  return (
    <ProductsContainer>
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="https://img.freepik.com/premium-vector/vegetable-grocery-delivery-promotion-facebook-cover-web-banner-social-media-post-template_584651-68.jpg" alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://img.freepik.com/free-vector/beautiful-banner-floral-leaves-template_21799-2812.jpg?size=626&ext=jpg&ga=GA1.2.1493657015.1690885278&semt=ais" alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://img.freepik.com/free-psd/spring-sale-social-media-cover-template_47987-15231.jpg?size=626&ext=jpg&ga=GA1.2.1493657015.1690885278&semt=ais" alt="Third slide" />
          </div>
        </div>
        <a className="carousel-control-prev" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      <FiltersContainer style={{gap:'20px'}}>
        <div className='w-100'>
        <h3>Search By Product Name</h3>
      <SearchBar
        type="text"
        placeholder="Search by product name"
        value={searchQuery}
        onChange={handleSearchChange}
      />
        </div>

      {/* Create the category filter dropdown */}
      <div className='w-100'>
      <h3>Filter By Category</h3>
      <CategoryFilter onChange={handleCategoryChange} value={selectedCategory}>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </CategoryFilter></div>
      </FiltersContainer>

      <Heading>Products</Heading>
      <StyledList>
        {filteredProducts.map((product) => (
          <ListItem key={product._id}>
            <ProductItem
              id={product._id}
              img={product.image}
              name={product.productname}
              description={product.description}
              price={product.price}
            />
          </ListItem>
        ))}
      </StyledList>
    </ProductsContainer>
  );
};

export default Products;




