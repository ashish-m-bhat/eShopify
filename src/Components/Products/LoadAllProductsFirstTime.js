import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../Store/ProductsStore';

export default function LoadAllProductsFirstTime() {
  console.log("Load Products for first time");
    const dispatcher = useDispatch();

    // indirectly call setAllProductsArray using the thunk fetchProducts()
    useEffect(() => {
      dispatcher(fetchProducts());
    }, [dispatcher])

  return (
    <></>
  )
}
