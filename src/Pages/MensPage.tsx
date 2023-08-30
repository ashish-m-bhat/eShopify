import React from 'react';
import DisplayProducts from '../Components/Products/DisplayProducts';
import { useAppSelector } from '../Store/hooks';

// List all the products with category men's clothing

export default function MensPage() {
    const allProducts = useAppSelector(state => state.products.allProductsArray);
    const mensProducts = allProducts.filter(e => e.category === "men's clothing");
    return (
      <DisplayProducts productsToDisplay={mensProducts} />
    );
}
