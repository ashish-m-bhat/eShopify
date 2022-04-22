import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import useHttp from '../../CustomHooks/useHttp';
import DisplayOrderHistory from './DisplayOrderHistory';

// Fetches the order history for the user
export default function FetchOrderHistory() {
    const [orderHistoryArray, setOrderHistoryArray]=useState([]);
    const email = useSelector(state => state.auth.email);

    // orderHistoryArray is an array of arrays.
    // Each element of orderHistoryArray is an array which corresponds to an order. The elements within this array are objects which are different products
    // If 1st order has 2 products and 2nd order has 1 prod : [[{prod1}, {prod2}], [{prod1}]]
    const postFetchFunction = useCallback((data) =>{
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

  return (
      <>
        <h1>Order History</h1>
        {orderHistoryArray.length === 0?<h2>No order history found</h2>:<DisplayOrderHistory orderHistoryArray={orderHistoryArray} />}
      </>
  );
}
