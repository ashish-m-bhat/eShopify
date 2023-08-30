import React from 'react';
import DisplayProducts from '../Components/Products/DisplayProducts';
import { useAppSelector } from '../Store/hooks';

// Products to be shown in the homepage. Shows products with rating >=3.5

const MINIMUM_RATING = 3.5;
export default function HomePage() {
  const username = useAppSelector(state => state.auth.username);

  const allProducts = useAppSelector(state => state.products.allProductsArray);
  const featuredProducts = allProducts.filter(eachProduct => eachProduct.rating.rate >= MINIMUM_RATING)

  return (
    <>
      {username && <h1>Welcome {username}!</h1>}
      <DisplayProducts productsToDisplay={featuredProducts} />
    </>
    );
}
