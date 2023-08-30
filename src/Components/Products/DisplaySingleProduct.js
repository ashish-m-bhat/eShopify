import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { addItemToCart } from '../../Store/CartStore';
import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';
import StarRating from '../../UI/StarRating/StarRating';
import cssClasses from './DisplaySingleProduct.module.css'

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
            dispatcher(addItemToCart(item));
        }
    }
    // Display the image and description of the product. The image opens in a new tabe when clicked
    return(
        <div className={cssClasses.productInfo}>
            <h1>{selectedProduct.title} </h1>
            <span className={cssClasses.imageAndDescription}>
                <a href={selectedProduct.image} target='_blank' rel='noreferrer'>
                    <Card className={cssClasses.eachProductImageContainer}>
                        <img src={selectedProduct.image} alt='' className={cssClasses.eachProductImage}/>
                    </Card>
                </a>
                <span className={cssClasses.description}>
                    <p>{selectedProduct.description}</p>
                    <p>Price : $ {selectedProduct.price}</p>
                    <p>Rating {selectedProduct.rating.rate}({selectedProduct.rating.count})</p>
                    <StarRating rating={selectedProduct.rating.rate} size={25}/>
                    <Button onClick={addItemToCartHandler}>Add to Cart</Button>
                </span>
            </span>
        </div>
      )
}
