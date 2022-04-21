import React from 'react'
import { Redirect } from 'react-router-dom'
import { Route } from 'react-router-dom'
import GetCart from '../Components/Cart/GetCart'

// Brings in GetCart which eventually displays the cart items
export default function CartPage() {
  return (
      <>
        <Route path='/cart/:anything' >
            <Redirect to='/cart' />
        </Route>
        <GetCart />
      </>
  )
}
