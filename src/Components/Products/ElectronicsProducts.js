import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Get all the products and filter for electronic category
export default function ElectronicsProducts() {
  const allProducts = useSelector(state => state.products.allProductsArray);
  const electronicsProducts = allProducts.filter(e => e.category === "electronics");

  const history = useHistory();

  // When an item is clicked, redirect the location
  const callDisplaySingleProduct = (id) =>{
      history.push(`/shop/${id}`)
  }

    return (
      <div>
        {electronicsProducts.map(e => {
          return(
            <div key={e.id} onClick={() => callDisplaySingleProduct(e.id)}>
            <p>{e.title} </p>
            <img src={e.image} alt='' height={"100px"} width={"100px"}/>
            </div>
          )
        })}
      </div>
    )
  }
