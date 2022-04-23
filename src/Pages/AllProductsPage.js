import React from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import DisplayProducts from '../Components/Products/DisplayProducts';

// Used to display all the products
// Also used to display products based on search by extracting the query parameters
// Filtered products contain the searched value in either the title or the description

export default function AllProductsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search).get('search');
  let allProducts = useSelector(state => state.products.allProductsArray);

  if(searchParams){
    const filteredProducts = allProducts.filter(eachProduct => eachProduct.title.toLowerCase().includes(searchParams.toLowerCase()) ||
                                          eachProduct.description.toLowerCase().includes(searchParams.toLowerCase()));
    allProducts = filteredProducts;
  }

// Pass a new array since it would be modified while sorting
// If the redux array is tried to be mutated, it error out s
  return (
    <React.Fragment>
      {searchParams && <h2>Search Results for <span style={{'fontSize':'2vw', 'color':'lightGreen'}}>{searchParams}</span></h2>}
      <DisplayProducts productsToDisplay={[...allProducts]} />
    </React.Fragment>
  )
}
