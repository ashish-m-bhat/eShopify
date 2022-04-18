import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom'

export default function DisplaySingleProduct() {
    const selectedItem = useParams();
    const history = useHistory();

    // Get the selected product
    const allProducts = useSelector(state => state.products.allProductsArray);
    const currentProduct = allProducts.filter(e => e.id === +selectedItem.singleProduct)

    // If a user enters a random id in the url, redirect to /shop/all
    if(!currentProduct.length){
        history.push('/shop/all')
        return;
    }

    return(
        <div>
        <p>{currentProduct[0].title} </p>
        <img src={currentProduct[0].image} alt='' height={"500px"} width={"600px"}/>
        <p>{currentProduct[0].description}</p>
        <p>Price : {currentProduct[0].price}</p>
        <p>Rating {currentProduct[0].rating.rate}({currentProduct[0].rating.count})</p>
        </div>
      )
}
