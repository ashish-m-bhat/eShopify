import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// List all the products
export default function AllProducts() {
  const history = useHistory()
  const allProducts = useSelector(state => state.products.allProductsArray);

  // When an item is clicked, redirect the location
  const callDisplaySingleProduct = (id) =>{
    history.push(`/shop/${id}`)
  }

  return (
    <div>
      {allProducts.map(e => {
        return(
          <div key={e.id} onClick={() => callDisplaySingleProduct(e.id)}>
          <p>{e.title} </p>
          <img src={e.image} alt='' height={"100px"} width={"100px"} loading="lazy"/>
          </div>
        )
      })}
    </div>
  )
}
