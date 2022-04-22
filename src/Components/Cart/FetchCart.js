import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DisplayCart from './DisplayCart';

// Get the items from cart table in userDB and display them using DisplayCart component
export default function FetchCart() {
    const username = useSelector(state => state.auth.username);
    const [cartArray, setCartArray] = useState([]);

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

    return (
      <>
        <h1>Cart of {username}</h1>
        <DisplayCart cartArray={cartArray} />
      </>
    )
}
