import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from '../../Store/AuthStore';
import { cartActions } from '../../Store/CartSore';

// Logs out a user by calling the logout() in the redux store
export default function Logout(props) {
    const dispatcher = useDispatch();

    // useEffect along with props.setCallLogout is used to prevent the warning of 'Cannot update a component while rendering a different component'
    useEffect(() => {
        props.setCallLogout(false);
        dispatcher(authActions.logout());

        // Delete the DB that has 'cart' table
        dispatcher(cartActions.deleteDB());

    }, [props.setCallLogout])

  return (
    <></>
  )
}
