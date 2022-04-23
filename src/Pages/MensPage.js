import React from 'react';
import { useSelector } from 'react-redux';
import DisplayProducts from '../Components/Products/DisplayProducts';

// List all the products with category men's clothing

export default function MensPage() {
    const allProducts = useSelector(state => state.products.allProductsArray);
    const mensProducts = allProducts.filter(e => e.category === "men's clothing");
    return (
      <DisplayProducts productsToDisplay={mensProducts} />
    );
}
