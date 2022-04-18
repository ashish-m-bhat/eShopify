import { Route, Switch } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import AuthPage from "./Pages/AuthPage";
import ElectronicsPage from "./Pages/ElectronicsPage";
import MensPage from "./Pages/MensPage";
import AllProductsPage from "./Pages/AllProductsPage";
import ProfilePage from "./Pages/ProfilePage";
import WomensPage from "./Pages/WomensPage";
import JeweleryPage from "./Pages/JeweleryPage";
import { Redirect } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
import { useSelector } from "react-redux";
import LoadAllProductsFirstTime from "./Components/Products/LoadAllProductsFirstTime";
import DisplaySingleProduct from "./Components/Products/DisplaySingleProduct";

// Takes the responsibility of setting up routes, some of which depend on the login state
function App() {
  const isUserLoggedIn = useSelector(state => state.auth.isUserLoggedIn);

  return (
    <div>
{/* NavigationBar includes Links to pages*/}
      <NavigationBar />

{/* Load the products through fetch and store initialize the redux store*/}
      <LoadAllProductsFirstTime />

      <Switch>

        <Route path="/" exact>
          <HomePage />
        </Route>

{/* If not logged in, display login form, else redirect to profile page */}
        <Route path="/auth">
          {!isUserLoggedIn && <AuthPage />}
          {isUserLoggedIn && <Redirect to='/' />}
        </Route>

{/* If logged in, display profile page , else redirect to login page */}
      <Route path="/profile">
        {isUserLoggedIn && <ProfilePage />}
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
