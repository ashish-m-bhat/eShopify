import React from 'react';
import DisplayProducts from '../Components/Products/DisplayProducts';
import { useAppSelector } from '../Store/hooks';

// List all the products with category jewelery

export default function JeweleryPage() {
  const allProducts = useAppSelector(state => state.products.allProductsArray);
  const jeweleryProducts = allProducts.filter(e => e.category === "jewelery");

  return (
    <DisplayProducts productsToDisplay={jeweleryProducts} />
  );
}
