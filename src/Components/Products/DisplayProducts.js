import React from 'react'
import { useHistory } from 'react-router-dom'

// Generic Component to display the given products

export default function DisplayProducts(props) {
    const history = useHistory();
    // When an item is clicked, redirect the location
    const callDisplaySingleProduct = (id) =>{
        history.push(`/shop/${id}`)
    }

    return (
        <div>
            {!props.productsToDisplay.length && <h1>Oops No Items Found</h1>}
            {props.productsToDisplay.map(eachProduct => {
                return(
                    <div key={eachProduct.id} onClick={() => callDisplaySingleProduct(eachProduct.id)}>
                    <p>{eachProduct.title} </p>
                    <img src={eachProduct.image} alt={eachProduct.title} height={"100px"} width={"100px"} loading="lazy"/>
                    </div>
                )
            })}
        </div>
    )
}
