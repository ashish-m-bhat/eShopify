import React from 'react';
import DisplayProducts from '../Components/Products/DisplayProducts';
import { useAppSelector } from '../Store/hooks';

// Get all the products and filter for electronics category

export default function ElectronicsPage() {
  const allProducts = useAppSelector(state => state.products.allProductsArray);
  const electronicsProducts = allProducts.filter(e => e.category === "electronics");

    return (
     <DisplayProducts productsToDisplay={electronicsProducts} />
    );
  }
