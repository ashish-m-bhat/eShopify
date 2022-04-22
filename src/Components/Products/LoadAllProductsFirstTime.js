import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../Store/ProductsStore';
import LoadingSpinner from '../UI/LoadingSpinner';

export default function LoadAllProductsFirstTime() {
  console.log("Load Products for first time");
    const dispatcher = useDispatch();
    const [isLoading, setIsLoading] = useState(true); // Set Loading to true immedietly

    // indirectly call setAllProductsArray using the thunk fetchProducts()
    useEffect(() => {
      dispatcher(fetchProducts());
      // Stop the Spinner
      setIsLoading(false);
    }, [dispatcher])

  return (
    <>
      {isLoading && <LoadingSpinner />}
    </>
  )
}
