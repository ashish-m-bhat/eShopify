import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function WomensProducts() {
  const allProducts = useSelector(state => state.products.allProductsArray);
  const womensProducts = allProducts.filter(e => e.category === "women's clothing");

  const history = useHistory();

  // When an item is clicked, redirect the location
  const callDisplaySingleProduct = (id) =>{
    history.push(`/shop/${id}`)
  }

    return (
      <div>
        {womensProducts.map(e => {
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
