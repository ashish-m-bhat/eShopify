import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import DisplayCart from './DisplayCart';

// Get the items from cart table in userDB and display them using DisplayCart component
export default function FetchCart() {
    const username = useSelector(state => state.auth.username);
    const [cartArray, setCartArray] = useState([]);
    const [callSpinner, setCallSpinner] = useState(true);
    const history = useHistory();

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
        return(
          <>
            <h2>Your Cart is empty!</h2>
          <Button onClick={()=>history.push('/shop/all')}>Shop Now</Button>
          </>
        );
    }
    return (
      <>
        <h1 style={{'textAlign':'center'}}>Cart of {username}</h1>
        {/* Spinner is called meanwhile the cart array is populated */}
        {callSpinner && <LoadingSpinner setCallSpinner={setCallSpinner} timeout={100}/>}
        {!callSpinner && <DisplayCart cartArray={cartArray} />}
      </>
    )
}