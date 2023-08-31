import React from 'react'
import PlaceOrder from './PlaceOrder';
import { addItemToCart, removeItemFromCart } from '../../Store/CartStore';
import {MdOutlineAdd, MdOutlineRemove} from 'react-icons/md';
import {RiDeleteBin6Line} from 'react-icons/ri';
import cssClasses from './DisplayCart.module.css';
import Card from '../../UI/Card/Card';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAppDispatch, useAppSelector } from '../../Store/hooks';
import { CartItem } from '../../Store/model';

interface Props {
  cartArray: Array<CartItem>
};

// Displays each product in the cart, received by ProfilePage
// Also calls PlaceOrder that has a 'Place Order' buttton clicking which sends the order to the DB.

export default function DisplayCart(props: Props) {
  const dispatcher = useAppDispatch();
  const history = useHistory();
  const email = useAppSelector(state => state.auth.email);

  // Increase an item's count
  const increaseItemInCartHandler = (productToIncrease: CartItem) =>{
     dispatcher(addItemToCart({id:productToIncrease.id, title:productToIncrease.title, email:email, count:1, price:productToIncrease.price, image:productToIncrease.image, href:productToIncrease.href}));

  }
  // Decrease an item's count
  const decreaseItemInCartHandler = (productToDecrease: CartItem) =>{
    dispatcher(removeItemFromCart({id:productToDecrease.id, title:productToDecrease.title, email:email, count:1, price:productToDecrease.price, image:productToDecrease.image, href:productToDecrease.href}));
 }
  // Remove an item from the cart. Pass the removeItemCompletely:true to the reducer
 const deleteItemInCartHandler = (productToRemove: CartItem) =>{
  dispatcher(removeItemFromCart({
    id:productToRemove.id,
    title:productToRemove.title,
    email:email,
    price:productToRemove.price,
    image:productToRemove.image,
    href:productToRemove.href,
    count: -1, // dummy value
    removeItemCompletely:true
  }));
}
  return (
    <>
      <div className={cssClasses.eachItemWrapper}>
          {props.cartArray.map(eachProduct => {
                  return(
                      <Card key={eachProduct.id} className={cssClasses.eachItem}>
                        <span onClick={() => history.push(eachProduct.href)} className={cssClasses.titleImage}>
                          <p>{eachProduct.title}</p>
                          <img alt={eachProduct.title} src={eachProduct.image} />
                        </span>
                        <span>
                          <MdOutlineRemove size={30} onClick={()=>decreaseItemInCartHandler(eachProduct)} className={cssClasses.MdOutline}/>
                          {" "}
                          <MdOutlineAdd size={30} onClick={()=>increaseItemInCartHandler(eachProduct)} className={cssClasses.MdOutline}/>
                          {" "}{" "}
                          <RiDeleteBin6Line size={25} onClick={()=>deleteItemInCartHandler(eachProduct)} className={cssClasses.MdOutline} />
                        </span>
                        <p>{eachProduct.price} x {eachProduct.count} = $ {eachProduct.price*eachProduct.count}</p>
                      </Card>
                  )
          })}
      </div>
      <PlaceOrder cartArray={props.cartArray}/>
    </>
  )
}


DisplayCart.propTypes = {
  cartArray:PropTypes.arrayOf(PropTypes.shape({
    count:PropTypes.number,
    href:PropTypes.string,
    price:PropTypes.number
  }))
}