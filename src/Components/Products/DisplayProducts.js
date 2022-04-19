import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

// Function to sort the products
// Takes in sortBy that tells the way to sort and productsToDisplay which is an array of products
const sortProducts = (sortBy, productsToDisplay) =>{
    switch(sortBy){
        case 'popularity':
                productsToDisplay.sort((a,b) => b.rating.rate - a.rating.rate);
                break;
        case 'priceLowToHigh':
                productsToDisplay.sort((a,b) => a.price - b.price);
                break;
        case 'priceHighToLow':
                productsToDisplay.sort((a,b) => b.price - a.price);
                break;
        default:
    }
}

// When an item is clicked, redirect the location to display the single product
// Takes in the id of the clicked item & the useHistory() variable since useHistory cannot be called outside of a React component
const callDisplaySingleProduct = (id, history) =>{
    history.push(`/shop/${id}`)
}

// Generic Component to display the given products
export default function DisplayProducts(props) {
    const location = useLocation();
    const history = useHistory();
    const sortBy = new URLSearchParams(location.search).get('sort');

    // To set the sorting method when the user selects an option
    const sortHandler = (event) =>{
        // If a sort option has been clicked, remove the placeHolder
        if(document.querySelector('#sortSelect').children[0].value === 'placeHolder'){
            document.querySelector('#sortSelect').children[0].remove();
        }
        // Append the selected sorting method value
        history.push(`${location.pathname}?sort=${event.target.value}`);
    }

    // If a sort option has been clicked, call sortProducts()
    if(sortBy !== ''){
        sortProducts(sortBy, props.productsToDisplay)
    }

    /* Returns
        1. A select tag for sorting
        2. A display message if Products are empty.
        TODO:https://github.com/Ashish-M-Bhat/eShopify/issues/5 : This shows up in that 1ms delay when products are searched. Add a loading spinner
        3. Map through the array and display each product
    */
    return (
        <div>
            <select onChange={(e) => sortHandler(e)} id="sortSelect">
                <option value="placeHolder" defaultValue={true}>Sort</option>
                <option value="popularity">Sort By Popularity</option>
                <option value="priceLowToHigh">Price Low To High</option>
                <option value="priceHighToLow">Price High to Low</option>
            </select>

            {!props.productsToDisplay.length && <h1>Oops No Items Found</h1>}

            {props.productsToDisplay.map(eachProduct => {
                return(
                    <div key={eachProduct.id} onClick={() => callDisplaySingleProduct(eachProduct.id, history)}>
                    <p>{eachProduct.title} </p>
                    <img src={eachProduct.image} alt={eachProduct.title} height={"100px"} width={"100px"} loading="lazy"/>
                    </div>
                )
            })}
        </div>
    )
}

/*
How Sorting Works?

1. When the page loads, the default 'placeHolder' option is selected.
2. When the user clicks an option, the sortHandler is called.
3. sortHandler checks if the value of 1st child element of the <select> is placeHolder. If yes, remove it.
4. Append the ?sort=<selected value> to the url
5.Component re renders and this time the variable sortBy isn't empty.
6. sortProducts gets called, which then sorts the products array
7. Since the productsToDisplay array is a props, the component re renders

 */
