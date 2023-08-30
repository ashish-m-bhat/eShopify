import React, {useEffect} from 'react'
import { authActions } from '../../Store/AuthStore';
import { cartActions } from '../../Store/CartStore';
import { useAppDispatch } from '../../Store/hooks';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';

// Logs out a user by calling the logout() in the redux store
export default function Logout(props) {
    const dispatcher = useAppDispatch();

    // useEffect along with props.setCallLogout is used to prevent the warning of 'Cannot update a component while rendering a different component'
    useEffect(() => {
        props.setCallLogout(false);
        dispatcher(authActions.logout());

        // Delete the DB that has 'cart' table
        dispatcher(cartActions.deleteDB());

    }, [props, dispatcher])

  return (
    <>
      <LoadingSpinner />
    </>
  )
}