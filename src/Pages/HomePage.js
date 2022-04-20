import React from 'react'
import { useSelector } from 'react-redux';
import FeaturedProducts from '../Components/Products/FeaturedProducts'

export default function HomePage() {
  const username = useSelector(state => state.auth.username);
  return (
    <>
      {username && <h1>Welcome {username}!</h1>}
      <FeaturedProducts/>
    </>
    );
}
