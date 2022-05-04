import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Store/ProductsStore';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';

export default function LoadAllProductsFirstTime() {
  console.log("Load Products for first time");
    const dispatcher = useDispatch();
    const loadProductsStatus = useSelector(state => state.products.status);

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
