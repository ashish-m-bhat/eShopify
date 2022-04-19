import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
    <form>
      <input type="text" placeholder="Search Products" value={searchValue} onChange={(event)=>setSearchValue(event.target.value)}/>
      <button onClick={searchProductsHandler}>Search</button>
      <button onClick={()=> setSearchValue('')}>X</button>
    </form>
  );
}
