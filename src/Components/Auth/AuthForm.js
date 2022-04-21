import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useHttp from '../../CustomHooks/useHttp';
import { authActions } from '../../Store/AuthStore';
import { cartActions } from '../../Store/CartStore';


// Has a form for Login Or Signup
// With the help of useHttp custom hook, it checks for credentials
// The postFetchFunction helps in updating the redux DB using useDispatch()

export default function AuthForm(){
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const formRef = useRef();

  const history = useHistory();
  const dispather = useDispatch();

  // Function to be executed after fetch is satified
  const postFetchFunction = (data) =>{
    dispather(authActions.login(data));

    // After login, instantiate the DB which has 'cart' table.
    dispather(cartActions.instantiateDB());

    // Once logged in, go back. This is because, if user isn't logged in he is redirected to login when he tries to add a product to cart
    // Hence we must take him back to the same page.
    history.goBack();
  }

  // Function to clear Form
  const clearForm =() =>{
    emailRef.current.value = '';
    passwordRef.current.value = '';
    formRef.current.value = '';
  }

  // useHttp custom hook returns a pointer to this satisfyRequest
  // This has to inside a react component/function.
  const satisfyRequest =  useHttp(postFetchFunction);

  //Function to be executed when login/signup button is clicked
  const loginSignupHandler=(event) =>{
    event.preventDefault();

    const apiKey='AIzaSyA357y-kI6368NgHXnMI5pW77y71GqpGuw';
    const url= isLogin?'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=':'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='

    const requestConfig = {url:url+apiKey, method:'POST', body:JSON.stringify({email:emailRef.current.value,password:passwordRef.current.value, returnSecureToken:true}), headers:{'Content-type':'application/json'}}

    satisfyRequest(requestConfig);
    clearForm();
  }

  // Function to toggle between Login and Signup
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    clearForm();
  };

  return (
    <section>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form ref={formRef}>
        <div>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailRef} required />
        </div>
        <div>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordRef} required />
        </div>
        <div>
          <button onClick={loginSignupHandler}>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};