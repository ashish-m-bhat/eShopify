import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { cartActions } from '../../Store/CartStore';
import Button from '../../UI/Button/Button';

// Displays a single product
// Allows the user to add item to the cart. If the user isn't logged in, he is taken to the login page and brought back to this page
// If the product isn't available ( when a user types manually the link in the address bar) ihe is redirected to the /shop/all page

export default function DisplaySingleProduct() {
    const selectedItem = useParams();
    const history = useHistory();
    const dispatcher = useDispatch();
    const isUserLoggedIn = useSelector(state => state.auth.isUserLoggedIn);
    const email = useSelector(state => state.auth.email);

    // Get the selected product
    const allProductsArray = useSelector(state => state.products.allProductsArray);
    const currentProductArray = allProductsArray.filter(e => e.id === +selectedItem.singleProduct);

    // If a user enters a random id in the url, redirect to /shop/all
    // allProducts.length is checked because in case the user enters the id in the url, the allProducts array takes a bit time to get populated, hence will the filtered array. Because of this, if the condition is absent the redirection happens even though the array would have been populated after a few ms.

    if(!currentProductArray.length){
        if(allProductsArray.length)
            history.push('/shop/all');
        return;
    }
    const selectedProduct = currentProductArray[0];

    const addItemToCartHandler = () =>{
        // If user isn't logged in, redirect to /auth. Upon sucessfull login, he will be redirected to this page again
        if(!isUserLoggedIn){
            history.push('/auth');
        }
        else{
            const item = {id:+selectedProduct.id, email:email, title:selectedProduct.title, image:selectedProduct.image, href:history.location.pathname, price:selectedProduct.price};
            dispatcher(cartActions.addItemToCart(item));
        }
    }
    return(
        <div>
            <p>{selectedProduct.title} </p>
            <img src={selectedProduct.image} alt='' height={"500px"} width={"600px"}/>
            <p>{selectedProduct.description}</p>
            <p>Price : {selectedProduct.price}</p>
            <p>Rating {selectedProduct.rating.rate}({selectedProduct.rating.count})</p>
            <Button onClick={addItemToCartHandler}>Add to Cart</Button>
        </div>
      )
}
