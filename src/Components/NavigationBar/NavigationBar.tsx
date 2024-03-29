import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logout from "../Auth/Logout";
import SearchProducts from "./SearchProducts";
import { CgProfile } from "react-icons/cg";
import {MdOutlineShoppingCart, MdOutlineLogin, MdOutlineLogout} from "react-icons/md";
import cssClasses from './NavigationBar.module.css';
import { useAppSelector } from "../../Store/hooks";

export default function NavigationBar() {
  const [callLogout, setCallLogout] = useState(false);
  const isUserLoggedIn = useAppSelector(state => state.auth.isUserLoggedIn);
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

          <li className={cssClasses.login}>
            {!isUserLoggedIn && (
              <NavLink to="/auth">
                <MdOutlineLogin  color="gray" />
                <span className={cssClasses.loginText}>Login</span>
              </NavLink>
            )}
          </li>

          <li className={cssClasses.profile}>
            {isUserLoggedIn && (
              <NavLink to="/profile">
                <CgProfile  />
                <span className={cssClasses.profileText}>Profile</span>
              </NavLink>
            )}
          </li>

          <li className={cssClasses.cart}>
            {isUserLoggedIn && (
              <NavLink to="/cart">
                <MdOutlineShoppingCart color="gray" />
                <span className={cssClasses.cartText}>Cart</span>
              </NavLink>
            )}
          </li>

          <li className={cssClasses.logout}>
            {isUserLoggedIn && (
              <NavLink to="/" onClick={() => setCallLogout(true)}>
                <MdOutlineLogout color="gray" />
                <span className={cssClasses.logoutText}>Logout</span>
              </NavLink>
            )}
          </li>
        </ul>
        {callLogout && <Logout setCallLogout={setCallLogout} />}
      </nav>
    </header>
  );
}
