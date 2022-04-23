import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from '../../searchIcon.png';
import cssClasses from './NavigationBar.module.css';

// Used to search through all the products
// Has a form, which on submission redirects the page to /shop/all?search=<searched value>

export default function SearchProducts() {
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();

  const searchProductsHandler = (event) =>{
      event.preventDefault();
      history.push(`/shop/all?search=${searchValue}`)
      setSearchValue('');
  }
  return (
    <form onSubmit={searchProductsHandler}>
      <input type="text" placeholder="Search" value={searchValue} onChange={(event)=>setSearchValue(event.target.value)}/>
      <img src={logo} onClick={searchProductsHandler} className={cssClasses.searchIcon} alt="searchIcon"></img>
    </form>
  );
}
