import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useHttp from '../../CustomHooks/useHttp'
import { cartActions } from '../../Store/CartStore';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';

// Gets the cartArray from DisplayCart and POSTs it to the Firebase DB
export default function PlaceOrder(props) {
    const [isLoading, setIsLoading] = useState(false);
    const history =useHistory();
    const dispatcher = useDispatch();
    let totalBill = 0;
    // Function to be excuted after order has been placed. Empty the cart and redirect to /profile
    const postFetchFunction = useCallback((data) => {
        // Stop the Loading Spinner
        setIsLoading(false);
        alert("Order Placed");
        dispatcher(cartActions.emptyCart());
        history.push('/profile')
    },[dispatcher, history]);

    const satisfyPostRequest =  useHttp(postFetchFunction);

    const cartArrayToBeOrdered = props.cartArray.map(eachProduct => {
                                    const {title, count, email, price} = eachProduct;
                                    const totalItemPrice = price*count;
                                    totalBill += totalItemPrice;
                                    return {email, title, count, totalItemPrice};
                                });
    totalBill = Math.round(totalBill);
    cartArrayToBeOrdered.push({totalBill});

    const placeOrderHandler = () =>{
        const requestConfig = {
            url:'https://react-http-bf239-default-rtdb.firebaseio.com/products.json',
            method:'POST',
            body:JSON.stringify(cartArrayToBeOrdered),
            headers:{'Content-type':'application/json'}
        }
        satisfyPostRequest(requestConfig);
        // Start the LoadingSpinner
        setIsLoading(true);
    }
  return (
    <div>
        {props.cartArray.length > 0 && <h2>Your total is $ {totalBill}</h2>}
        <button hidden={!props.cartArray.length} onClick={placeOrderHandler}>Place Order</button>
        {isLoading && <LoadingSpinner/>}
    </div>
  )
}
