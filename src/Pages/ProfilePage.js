import React from 'react';
import { useSelector } from 'react-redux';

// Displays user info & order history
export default function ProfilePage() {
  const username = useSelector(state => state.auth.username);
  return (
    <>
      <h1>Profile of {username}</h1>
      <p>Username & email goes here</p>
      <p>Order History goes here</p>
    </>
  )
}
