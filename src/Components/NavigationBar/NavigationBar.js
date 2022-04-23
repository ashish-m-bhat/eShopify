import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Logout from "../Auth/Logout";
import SearchProducts from "./SearchProducts";
import cssClasses from './NavigationBar.module.css';


export default function NavigationBar() {
  const [callLogout, setCallLogout] = useState(false);
  const isUserLoggedIn = useSelector(state => state.auth.isUserLoggedIn);
  return (
    <header className={cssClasses.header}>
      <Link to="/" className={cssClasses.logo}>
        <h1>eShopify</h1>
      </Link>
    <nav>
      <ul>
        <li>
          <NavLink to="/shop/men">Men</NavLink>
        </li>

        <li>
          <NavLink to="/shop/women">Women</NavLink>
        </li>

        <li>
          <NavLink to="/shop/electronics">Electronics</NavLink>
        </li>

        <li>
          <NavLink to="/shop/jewelery">Jewelery</NavLink>
        </li>

        <li>
          <NavLink to="/shop/all">All</NavLink>
        </li>

        <li>
         <SearchProducts />
        </li>

        <li>
        {!isUserLoggedIn && <NavLink to="/auth">Login</NavLink> }
        </li>

        <li>
        {isUserLoggedIn && <NavLink to="/profile">Profile</NavLink> }
        </li>

        <li>
        {isUserLoggedIn && <NavLink to="/cart">Cart</NavLink> }
        </li>

        <li>
        {isUserLoggedIn && <NavLink to="/" onClick={()=>setCallLogout(true)}>Logout</NavLink> }
        </li>

      </ul>
      {callLogout && <Logout setCallLogout={setCallLogout}/>}
    </nav>
    </header>
  );
}
