import React from 'react';
import FetchOrderHistory from '../Components/OrderHistory/FetchOrderHistory';
import Card from '../UI/Card/Card';
import cssClasses from '../Components/OrderHistory/DisplayOrderHistory.module.css';
import { useAppSelector } from '../Store/hooks';

// Displays user info & order history
export default function ProfilePage() {
  const username = useAppSelector(state => state.auth.username);
  const email = useAppSelector(state => state.auth.email);

  return (
    <>
      <h1>Profile of {username}</h1>
      <Card className={cssClasses.userInfo}>
        <p>Username : {username}</p>
        <p> Email : {email} </p>
      </Card>
      <FetchOrderHistory />
    </>
  )
}
