import React from 'react'
import { useLocation } from 'react-router-dom';
import AllProducts from '../Components/Products/AllProducts'

// Used to display all the products
// Also used to display products based on search by extracting the query parameters

export default function AllProductsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search).get('search');

  return (
    <React.Fragment>
      <AllProducts searchParams={searchParams}/>
    </React.Fragment>
  )
}
