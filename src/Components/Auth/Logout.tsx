import React, {useEffect} from 'react'
import { authActions } from '../../Store/AuthStore';
import { cartActions } from '../../Store/CartStore';
import { useAppDispatch } from '../../Store/hooks';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';

interface Props {
  setCallLogout: React.Dispatch<React.SetStateAction<boolean>>;
}

// Logs out a user by calling the logout() in the redux store
const Logout:React.FC<Props> = (props) => {
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
export default Logout;

