import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import useHttp from '../../CustomHooks/useHttp'
import { emptyCart } from '../../Store/CartStore';
import { useAppDispatch } from '../../Store/hooks';
import { CartItem, OrderItem } from '../../Store/model';
import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import cssClasses from './DisplayCart.module.css';

interface Props {
    cartArray: Array<CartItem>;
};

// Gets the cartArray from DisplayCart and POSTs it to the Firebase DB
export default function PlaceOrder(props: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const history =useHistory();
    const dispatcher = useAppDispatch();
    let totalBill = 0;
    // Function to be excuted after order has been placed. Empty the cart and redirect to /profile
    const postFetchFunction = useCallback(() => {
        // Stop the Loading Spinner
        setIsLoading(false);
        alert("Order Placed");
        dispatcher(emptyCart());
        history.push('/profile')
    },[dispatcher, history]);

    const satisfyPostRequest =  useHttp(postFetchFunction);

    const cartArrayToBeOrdered: Array<OrderItem> = props.cartArray.map(eachProduct => {
                                    const {id, title, count, email, price} = eachProduct;
                                    const totalItemPrice = price*count;
                                    totalBill += totalItemPrice;
                                    return {id, email, title, count, totalItemPrice};
                                });

    cartArrayToBeOrdered[0] = { ...cartArrayToBeOrdered[0], totalBill: Math.round(totalBill) };
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
    <Card className={cssClasses.placeOrderWrapper}>
        {props.cartArray.length > 0 && <h2>Your total is $ {totalBill}</h2>}
        <Button hidden={!props.cartArray.length} onClick={placeOrderHandler} className={cssClasses.placeOrderButton}>Place Order</Button>
        {isLoading && <LoadingSpinner/>}
    </Card>
  )
}
