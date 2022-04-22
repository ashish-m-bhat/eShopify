import React from 'react'
import { Redirect } from 'react-router-dom'
import { Route } from 'react-router-dom'
import FetchCart from '../Components/Cart/FetchCart'

// Brings in FetchCart which eventually displays the cart items
export default function CartPage() {
  return (
      <>
        <Route path='/cart/:anything' >
            <Redirect to='/cart' />
        </Route>
        <FetchCart />
      </>
  )
}
