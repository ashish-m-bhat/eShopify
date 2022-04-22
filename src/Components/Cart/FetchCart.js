import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../UI/LoadingSpinner';
import DisplayCart from './DisplayCart';

// Get the items from cart table in userDB and display them using DisplayCart component
export default function FetchCart() {
    const username = useSelector(state => state.auth.username);
    const [cartArray, setCartArray] = useState([]);
    const [callSpinner, setCallSpinner] = useState(true);

    // Get the cart from indexedDB
    useEffect(()=>{
      const openRequest = indexedDB.open('userDB', 1); // DB already exists
      openRequest.onsuccess = event =>{
        const openCursorReuest = openRequest.result.transaction('cart').objectStore('cart').openCursor();
        openCursorReuest.onsuccess = e =>{
          const cursor = openCursorReuest.result;
          if(cursor){
            setCartArray(state => [...state, cursor.value]);
            cursor.continue();
          }
        }

      }
    },[]);

   // If cartArray array is empty, call the Spinner
   // But even after 1s if the cartArray is still empty, display Empty Cart message.
    if(!cartArray.length){
      if(callSpinner)
        return <LoadingSpinner setCallSpinner={setCallSpinner} />
      else if(!callSpinner)
        return <h2>Your Cart is empty!</h2>
    }
    return (
      <>
        <h1>Cart of {username}</h1>
        <DisplayCart cartArray={cartArray} />
      </>
    )
}
