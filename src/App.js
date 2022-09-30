import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

//screens
import HomeScreen from "./screens/Home/HomeScreen";
import LoginScreen from "./screens/Login/LoginScreen";
import SignupScreen from "./screens/Signup/SignupScreen";

//components
import NavBar from "./screens/components/NavBar";

//custom hook
import { useAuthContext } from "./customHooks/useAuthContext";

function App() {
  const { user, isAuthReady } = useAuthContext();

  return (
    <div className="App">
      {isAuthReady && (
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/">
              {user ? <HomeScreen /> : <Redirect to="/login" />}
            </Route>

            <Route path="/login">
              {user ? <Redirect to="/" /> : <LoginScreen />}
            </Route>

            <Route path="/signup">
              {user ? <Redirect to="/" /> : <SignupScreen />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
