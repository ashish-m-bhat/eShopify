import React from 'react'
import { useSelector } from 'react-redux';
import DisplayProducts from './DisplayProducts';

// Get all the products and filter for electronics category
export default function ElectronicsProducts() {
  const allProducts = useSelector(state => state.products.allProductsArray);
  const electronicsProducts = allProducts.filter(e => e.category === "electronics");

    return (
     <DisplayProducts productsToDisplay={electronicsProducts} />
    );
  }
