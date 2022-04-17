import { Route, Switch } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import AuthPage from "./Pages/AuthPage";
import ElectronicsPage from "./Pages/ElectronicsPage";
import MensPage from "./Pages/MensPage";
import AllProductsPage from "./Pages/AllProductsPage";
import ProfilePage from "./Pages/ProfilePage";
import WomensPage from "./Pages/WomensPage";
import { Redirect } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";

function App() {
  // If logged in, /profile is enabled. else redirect to /auth

  let userIsLoggedIn = true;
  return (
    <div>
      <NavigationBar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
{/* If not logged in, display login form, else redirect to profile page */}
        <Route path="/auth">
          {!userIsLoggedIn && <AuthPage />}
          {userIsLoggedIn && <Redirect to='/profile' />}
        </Route>

{/* If logged in, display profile page , else redirect to login page */}
      <Route path="/profile">
        {userIsLoggedIn && <ProfilePage />}
        {!userIsLoggedIn && <Redirect to='/auth' />}
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

        <Route path="/shop/all">
          <AllProductsPage />
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
