import React, { FormEvent, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import Card from '../../UI/Card/Card'
import cssClasses from './DisplayProducts.module.less'
import StarRating from '../../UI/StarRating/StarRating';
import { Product } from '../../Store/model';

// Function to sort the products
// Takes in sortBy that tells the way to sort and productsToDisplay which is an array of products
const sortProducts = (sortBy: string, productsToDisplay: Product[]) =>{
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

/* Generic Component to display the given products
 Returns
    1. A select tag for sorting
    2. A display message if Products are empty.
    3. Map through the array and display each product
*/

interface Props {
    productsToDisplay: Product[]
};

const DisplayProducts:React.FC<Props> = (props) => {
    const location = useLocation();
    const history = useHistory<History>();
    const sortBy = new URLSearchParams(location.search).get('sort') || '';
    const searchedProduct =  new URLSearchParams(location.search).get('search');
    const [callSpinner, setCallSpinner] = useState(true);

    // When an item is clicked, redirect the location to display the single product
    // Takes in the id of the clicked item & the useHistory() variable since useHistory cannot be called outside of a React component
    const callDisplaySingleProduct = (id: Product['id']) =>{
        history.push(`/shop/${id}`)
    }

    // To set the sorting method when the user selects an option
    const sortHandler = (event: FormEvent<HTMLSelectElement>) =>{
        const targetValue = (event.target as HTMLSelectElement).value;
        // If a sort option has been clicked, remove the placeHolder
        const sortSelectElement = document.querySelector('#sortSelect')
        if((sortSelectElement?.children[0] as HTMLSelectElement).value === 'placeHolder'){
            sortSelectElement?.children[0].remove();
        }

        // Append the selected sorting method value. Check if ?search=something exists
        // We can't directly append & or ?sort=popularity using location.search since if we change the sorting method, the method gets appended to the previous sorting method in the URL
        let pathToBePushed = `${location.pathname}?`; // /shop/all?
        pathToBePushed += searchedProduct ? `search=${searchedProduct}&sort=${targetValue}` : `sort=${targetValue}`
        // /shop/all?search=jacket&sort=popularity : /shop/all?sort=popularity

        history.push(pathToBePushed);
    }

    // If a sort option has been clicked, call sortProducts()
    if(sortBy !== ''){
        sortProducts(sortBy, props.productsToDisplay)
    }

   // If productsToDisplay array is empty, call the spinner
   // But even after 1s if the productsToDisplay is still empty, display Not Found message.
   if(!props.productsToDisplay.length){
        if(callSpinner)
            return <LoadingSpinner setCallSpinner={setCallSpinner} timeout={2400}/>
        else  // callSpinner is set to false after 1s in the LoadingSpinner component
            return <h1 className={cssClasses.noItemsToDisplay}>No items To Display!</h1>
   }

    return (
        <>
            <div className={cssClasses.slct}>
                <select onChange={(e) => sortHandler(e)} id="sortSelect">
                    <option value="placeHolder">Sort</option>
                    <option value="popularity">Sort By Popularity</option>
                    <option value="priceLowToHigh">Price Low To High</option>
                    <option value="priceHighToLow">Price High to Low</option>
                </select>
            </div>
            <div className={cssClasses.productsSection}>
                {props.productsToDisplay.map(eachProduct => {
                    return(
                        <Card key={eachProduct.id} onClick={() => callDisplaySingleProduct(eachProduct.id)} className={cssClasses.eachProduct}>
                            <p>{eachProduct.title} </p>
                            <img src={eachProduct.image} alt={eachProduct.title} height={"10vg"} width={"10vw"} loading="lazy"/>
                            <p>${eachProduct.price}</p>
                            <StarRating rating={eachProduct.rating.rate} size={20}/>
                        </Card>
                    )
                })}
            </div>
        </>
    );
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
export default DisplayProducts;
