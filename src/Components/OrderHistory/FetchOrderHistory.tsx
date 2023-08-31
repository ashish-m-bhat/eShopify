import React, { useCallback, useEffect, useState } from 'react'
import useHttp from '../../CustomHooks/useHttp';
import DisplayOrderHistory from './DisplayOrderHistory';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import { useAppSelector } from '../../Store/hooks';
import { OrderItem } from '../../Store/model';

type EachOrder = Array<OrderItem>;

// Fetches the order history for the user
export default function FetchOrderHistory() {
    const [orderHistoryArray, setOrderHistoryArray]=useState<EachOrder[]>([]);
    const [callSpinner, setCallSpinner] = useState(true);
    const email = useAppSelector(state => state.auth.email);

    // orderHistoryArray is an array of arrays.
    // Each element of orderHistoryArray is an array which corresponds to an order. The elements within this array are objects which are different products
    // If 1st order has 2 products and 2nd order has 1 prod : [[{prod1}, {prod2}], [{prod1}]]
    const postFetchFunction = useCallback((data: any) =>{
        for(let key in data){
            // Get the current order. It is an array of products
            const currentOrder = data[key];
            // check if the indexed currenOrder is current user's order

            if(currentOrder[0].email === email){
                setOrderHistoryArray(state => [...state, currentOrder]);
            }
        }
    },[email]);

    const satisfyRequest =  useHttp(postFetchFunction);

    useEffect(() => {
        satisfyRequest({url:'https://react-http-bf239-default-rtdb.firebaseio.com/products.json', method:'GET'});
    }, [satisfyRequest]);

   // If orderHistoryArray array is empty, call the Spinner
   // But even after 1s if the orderHistoryArray is still empty, display No Order History message.
   if(!orderHistoryArray.length){
    if(callSpinner)
      return <LoadingSpinner setCallSpinner={setCallSpinner} />
    else
      return <h2>No order history found!</h2>
  }
  return (
      <>
        <h1>Order History</h1>
        {orderHistoryArray.length !== 0 && <DisplayOrderHistory orderHistoryArray={orderHistoryArray} />}
      </>
  );
}
