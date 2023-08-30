import { Route, Redirect, Switch } from "react-router-dom";
import './App.css'
import {AllProductsPage, AuthPage, ElectronicsPage, HomePage, JeweleryPage, MensPage, ProfilePage, WomensPage, CartPage} from './Pages'
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import LoadAllProductsFirstTime from "./Components/Products/LoadAllProductsFirstTime";
import DisplaySingleProduct from "./Components/Products/DisplaySingleProduct";
import ScrollToTop from "./UI/ScrollToTop/ScrollToTop";
import { useAppSelector } from "./Store/hooks";

// Takes the responsibility of setting up routes, some of which depend on the login state
function App() {
  const isUserLoggedIn = useAppSelector(state => state.auth.isUserLoggedIn);

  return (
    <div>
{/* NavigationBar includes Links to pages*/}
      <NavigationBar />

{/* Load the products through fetch and store initialize the redux store*/}
      <LoadAllProductsFirstTime />

{/* Always scroll to the top when a page render */}
      <ScrollToTop />
      <Switch>

        <Route path="/" exact>
          <HomePage />
        </Route>

{/* If not logged in, display login form, else redirect to profile page */}
        <Route path="/auth">
          {!isUserLoggedIn && <AuthPage />}
          {isUserLoggedIn && <Redirect to='/profile' />}
        </Route>

{/* If logged in, display profile page , else redirect to login page */}
      <Route path="/profile">
        {isUserLoggedIn && <ProfilePage />}
        {!isUserLoggedIn && <Redirect to='/auth' />}
      </Route>

{/* if user is logged in, cart can be viewed. Else, redirect to the login page */}
      <Route path="/cart">
        {isUserLoggedIn && <CartPage />}
        {!isUserLoggedIn && <Redirect to='/auth' />}
      </Route>

        <Route path="/shop/electronics">
          <ElectronicsPage />
        </Route>

        <Route path="/shop/men">
          <MensPage />
        </Route>

        <Route path="/shop/women">
          <WomensPage />
        </Route>

        <Route path="/shop/jewelery">
          <JeweleryPage />
        </Route>

        <Route path="/shop/all">
          <AllProductsPage />
        </Route>

        <Route path="/shop/:singleProduct">
          <DisplaySingleProduct />
        </Route>

{/* If nothing matches, redirect to home page */}
        <Route path="*">
          <Redirect to="/" />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
