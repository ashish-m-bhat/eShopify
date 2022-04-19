import React from 'react'
import { useSelector } from 'react-redux';
import DisplayProducts from './DisplayProducts';

// Products to be shown in the homepage. Shows products with rating >=3.5

const MINIMUM_RATING = 3.5;

export default function FeaturedProducts() {
    const allProducts = useSelector(state => state.products.allProductsArray);
    const featuredProducts = allProducts.filter(eachProduct => eachProduct.rating.rate >= MINIMUM_RATING)

    return (
      <DisplayProducts productsToDisplay={featuredProducts} />
    );
  }