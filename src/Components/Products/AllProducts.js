import React from 'react';
import { useSelector } from 'react-redux';
import DisplayProducts from './DisplayProducts';

// List all the products
export default function AllProducts() {
  const allProducts = useSelector(state => state.products.allProductsArray);

  return (
    <DisplayProducts productsToDisplay={allProducts} />
  );
}
