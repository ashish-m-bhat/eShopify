import React from 'react';
import { useSelector } from 'react-redux';
import DisplayProducts from '../Components/Products/DisplayProducts';

// List all the products with category jewelery

export default function JeweleryPage() {
  const allProducts = useSelector(state => state.products.allProductsArray);
  const jeweleryProducts = allProducts.filter(e => e.category === "jewelery");

  return (
    <DisplayProducts productsToDisplay={jeweleryProducts} />
  );
}
