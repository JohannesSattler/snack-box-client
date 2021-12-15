import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoadingComponent from "./components/Loading";
import Navbar from "./components/Navbar/Navbar";
import { getLoggedIn, logout } from "./services/auth";
import routes from "./config/routes";
import * as USER_HELPERS from "./utils/userToken";
import * as CONFIG from './config/config'
import './pages/landingpage.css'

import { UserContext } from "./context/UserContext";
import { CheckoutContext } from "./context/CheckoutContext";

export default function App() {
  const navigate = useNavigate()
  const {user, setUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = USER_HELPERS.getUserToken();
    if (!accessToken) {
      return setIsLoading(false);
    }
    getLoggedIn(accessToken).then((res) => {
      if (!res.status) {
        return setIsLoading(false);
      }
      setUser(res.data.user);
      setIsLoading(false);
    });
  }, []);

  // Check if signup stages are over
  useEffect(() => {
    if(user && user.signupStage < CONFIG.MAX_SIGNUP_STAGE) {
      console.log(user.signupStage)
      navigate('/signup/signup-information');
    }  
  }, [isLoading])

  function handleLogout() {
    const accessToken = USER_HELPERS.getUserToken();
    
    if (!accessToken) {
      setUser(null);
      navigate('/')
      return setIsLoading(false);
    }
    
    setIsLoading(true);
    
    logout(accessToken).then((res) => {
      if (!res.status) {
        // deal with error here
        console.error("Logout was unsuccessful: ", res);
      }
      USER_HELPERS.removeUserToken();
      setIsLoading(false);
      navigate('/')
      return setUser(null);
    });
  }

  function authenticate(user) {
    setUser(user);
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="App" id="wave">
        <Navbar handleLogout={handleLogout} user={user} />

        <div style={{marginTop: '65px'}}>
        <Routes>
          {routes({ user, authenticate, handleLogout }).map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
        </div>
    </div>
  );
}
