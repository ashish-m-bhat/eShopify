import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function NavigationBar() {
  let userIsLoggedIn = true;

  return (
    <header>
      <Link to="/">
        <h1>eShopify</h1>
      </Link>

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
          <NavLink to="/shop/all">All</NavLink>
        </li>

        <li>
        {!userIsLoggedIn && <NavLink to="/auth">Login</NavLink> }
        </li>

        <li>
        {userIsLoggedIn && <NavLink to="/profile">Profile</NavLink> }
        </li>

        <li>
        {userIsLoggedIn && <button onClick={()=>{}}>Logout</button> }
        </li>

      </ul>
    </header>
  );
}
