import React, { FormEvent, useCallback, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import {MdCancel} from 'react-icons/md';
import cssClasses from './NavigationBar.module.css';
import useDebounce from "../../CustomHooks/useDebounce";

// Used to search through all the products
// Has a form, which on submission redirects the page to /shop/all?search=<searched value>

export default function SearchProducts() {
  const searchBarRef = useRef<HTMLInputElement>(null); // Used to clear the search bar
  const history = useHistory();

  const searchProductsHandler = (event: FormEvent) =>{
      event.preventDefault();
      history.push(`/shop/all?search=${(event.target as HTMLInputElement).value}`)
    }

    // Use the debounced version
    const debounceSearchProductsHandler = useCallback(useDebounce(searchProductsHandler, 1000), [])

  return (
    <form onSubmit={searchProductsHandler}>
      <input type="text" placeholder="Search"  onChange={debounceSearchProductsHandler} ref={searchBarRef}/>
      <span className={cssClasses.clearSearchIcon}>
        <MdCancel style={{'paddingLeft': '0.5vw'}} onClick={()=>searchBarRef.current!.value = ''} />
      </span>
    </form>
  );
}
