import React from 'react';
import { useSelector } from 'react-redux';
import FetchOrderHistory from '../Components/OrderHistory/FetchOrderHistory';

// Displays user info & order history
export default function ProfilePage() {
  const username = useSelector(state => state.auth.username);
  const email = useSelector(state => state.auth.email);

  return (
    <>
      <h1>Profile of {username}</h1>
      <p>Username : {username}</p>
      <p> Email : {email} </p>
      <FetchOrderHistory />
    </>
  )
}
