import React from 'react';
import DisplayProducts from '../Components/Products/DisplayProducts';
import { useAppSelector } from '../Store/hooks';

// List all the products with category women's clothing

export default function WomensPage() {
  const allProducts = useAppSelector(state => state.products.allProductsArray);
  const womensProducts = allProducts.filter(e => e.category === "women's clothing");

  return (
    <DisplayProducts productsToDisplay={womensProducts} />
  );
}
