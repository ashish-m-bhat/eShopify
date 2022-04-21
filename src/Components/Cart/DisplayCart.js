import React from 'react'

// Displays each product in the cart, received by ProfilePage

export default function DisplayCart(props) {
  return (
    <div>
        {props.cartArray.map(eachProduct => {
                return(
                    <div key={eachProduct.itemId}>
                    <p>{eachProduct.title} ( id: {eachProduct.itemId}) * {eachProduct.count} </p>
                    <a href={eachProduct.href}><img src={eachProduct.image} height='100px' width='100px'/></a>
                    </div>
                )
            })}
    </div>
  )
}
