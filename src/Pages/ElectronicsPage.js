import React from 'react';
import { useSelector } from 'react-redux';
import DisplayProducts from '../Components/Products/DisplayProducts';

// Get all the products and filter for electronics category

export default function ElectronicsPage() {
  const allProducts = useSelector(state => state.products.allProductsArray);
  const electronicsProducts = allProducts.filter(e => e.category === "electronics");

    return (
     <DisplayProducts productsToDisplay={electronicsProducts} />
    );
  }
