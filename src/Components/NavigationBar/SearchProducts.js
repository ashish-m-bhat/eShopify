import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {MdSearch} from 'react-icons/md';
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
      <span className={cssClasses.searchIcon}>
        <MdSearch size={35} onClick={searchProductsHandler} />
      </span>
    </form>
  );
}
