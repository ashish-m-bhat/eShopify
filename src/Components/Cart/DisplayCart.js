import React, { useState } from 'react'
import PlaceOrder from './PlaceOrder';
import { cartActions } from '../../Store/CartStore';
import {MdOutlineAdd, MdOutlineRemove} from 'react-icons/md';
import {RiDeleteBin6Line} from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import cssClasses from './DisplayCart.module.css';
import Card from '../../UI/Card/Card';
import { useHistory } from 'react-router-dom';

// Displays each product in the cart, received by ProfilePage
// Also calls PlaceOrder that has a 'Place Order' buttton clicking which sends the order to the DB.

export default function DisplayCart(props) {
  // map is used to update the count of cart items
  // structure: oriductId => productCount
  let map = new Map();
  for(let eachCartProduct of props.cartArray){
    map.set(eachCartProduct.id, eachCartProduct.count);
  }

  const [countMap, setCountMap] = useState(map);
  const dispatcher = useDispatch();
  const history = useHistory();
  const email = useSelector(state => state.auth.email);

  // Increase an item's count
  const increaseItemInCartHandler = (productToIncrease) =>{
     dispatcher(cartActions.addItemToCart({id:productToIncrease.id, title:productToIncrease.title, email:email, count:1, price:productToIncrease.price, image:productToIncrease.image, href:productToIncrease.href}));
     const tempMap = new Map(countMap);
     tempMap.set(productToIncrease.id, countMap.get(+productToIncrease.id)+1);
     setCountMap(tempMap);
  }
  // Decrease an item's count
  const decreaseItemInCartHandler = (productToDecrease) =>{
    dispatcher(cartActions.removeItemFromCart({id:productToDecrease.id, title:productToDecrease.title, email:email, count:1, price:productToDecrease.price, image:productToDecrease.image, href:productToDecrease.href}));
    const tempMap = new Map(countMap);
    tempMap.set(productToDecrease.id, countMap.get(+productToDecrease.id)-1);
    setCountMap(tempMap);
 }
  // Remove an item from the cart. Pass the removeItemCompletely:true to the reducer
 const deleteItemInCartHandler = (productToRemove) =>{
  dispatcher(cartActions.removeItemFromCart({id:productToRemove.id, title:productToRemove.title, email:email, price:productToRemove.price, image:productToRemove.image, href:productToRemove.href, removeItemCompletely:true}));
  const tempMap = new Map(countMap);
  tempMap.set(productToRemove.id, 0);
  setCountMap(tempMap);
}
  return (
    <>
      <div className={cssClasses.eachItemWrapper}>
          {props.cartArray.map(eachProduct => {
                  return(
                      <Card key={eachProduct.id} className={cssClasses.eachItem} onClick={() => history.push(eachProduct.href)}>
                        <p>{eachProduct.title}</p>
                        <img alt={eachProduct.title} src={eachProduct.image} height='150px' width='150px' />
                        <span>
                          <MdOutlineRemove size={30} onClick={()=>decreaseItemInCartHandler(eachProduct)} className={cssClasses.MdOutline}/>
                          {" "}
                          <MdOutlineAdd size={30} onClick={()=>increaseItemInCartHandler(eachProduct)} className={cssClasses.MdOutline}/>
                          {" "}{" "}
                          <RiDeleteBin6Line size={25} onClick={()=>deleteItemInCartHandler(eachProduct)} className={cssClasses.MdOutline} />
                        </span>
                        <p>{eachProduct.price} x {countMap.get(eachProduct.id)} = $ {eachProduct.price*countMap.get(eachProduct.id)}</p>
                      </Card>
                  )
          })}
      </div>
      <PlaceOrder cartArray={props.cartArray} />
    </>
  )
}
