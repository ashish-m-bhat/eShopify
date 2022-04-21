import React from 'react'
import PlaceOrder from './PlaceOrder'

// Displays each product in the cart, received by ProfilePage
// Also calls PlaceOrder that has a 'Place Order' buttton clicking which sends the order to the DB.

export default function DisplayCart(props) {
  return (
    <div>
        {props.cartArray.map(eachProduct => {
                return(
                    <div key={eachProduct.itemId}>
                    <p>{eachProduct.title} x {eachProduct.count} </p>
                    <a href={eachProduct.href}><img alt={eachProduct.title} src={eachProduct.image} height='100px' width='100px' /></a>
                    <p>{eachProduct.price} x {eachProduct.count} = {eachProduct.price*eachProduct.count}</p>
                    </div>
                )
        })}
        <PlaceOrder cartArray={props.cartArray} />
    </div>
  )
}
