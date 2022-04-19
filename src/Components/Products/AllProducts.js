import React from 'react';
import { useSelector } from 'react-redux';
import DisplayProducts from './DisplayProducts';

// Lists all the products
// Also, if the searchParams passed by AllProductsPage through props isn't null, filter the products
// Filtered products contain the searched value in either the title or the description

export default function AllProducts(props) {
  let allProducts = useSelector(state => state.products.allProductsArray);

  if(props.searchParams){
    const filteredProducts = allProducts.filter(eachProduct => eachProduct.title.toLowerCase().includes(props.searchParams.toLowerCase()) ||
                                          eachProduct.description.toLowerCase().includes(props.searchParams.toLowerCase()));
    allProducts = filteredProducts;
  }

// Pass a new array since it would be modified while sorting
// If the redux array is tried to be mutated, it error out saying "Error while sorting of objects"
  return (
    <>
      {props.searchParams && <h2>Search Results for <span style={{'fontSize':'2vw', 'color':'lightGreen'}}>{props.searchParams}</span></h2>}
      <DisplayProducts productsToDisplay={[...allProducts]} />
    </>
  );
}
