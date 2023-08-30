import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../Store/hooks';
import { getProducts } from '../../Store/ProductsStore';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';

export default function LoadAllProductsFirstTime() {
    const dispatcher = useAppDispatch();
    const loadProductsStatus = useAppSelector(state => state.products.status);

    // indirectly call setAllProductsArray using the thunk fetchProducts()
    useEffect(() => {
      dispatcher(getProducts());
    }, [dispatcher])

  return (
    <>
      {loadProductsStatus==='pending' ? <LoadingSpinner />:loadProductsStatus==='rejected' ? console.log("Error on Loading products"):''}
    </>
  )
}
