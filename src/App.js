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
    const base_url = process.env.REACT_APP_API_BASE_URL
    console.log(base_url)
    
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
    <div className="App">
        <Navbar handleLogout={handleLogout} user={user} />
        <div className="wave-background"></div>
        <svg style={{width: '2000px', height: '550px', transform:'rotate(180deg)', transition: '0.3s', position: 'absolute', left: 0, top: '300px', zIndex: -1, backgroundSize: 'cover'}} viewBox="0 0 2000 500" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stopColor="rgba(0, 212, 255, 1)" offset="0%"></stop><stop stopColor="rgba(239, 119, 163, 1)" offset="100%"></stop></linearGradient></defs><path style={{transform: 'scale(1, 1)', opacity:'1'}} fill="url(#sw-gradient-0)" d="M0,49L80,114.3C160,180,320,310,480,326.7C640,343,800,245,960,171.5C1120,98,1280,49,1440,98C1600,147,1760,294,1920,294C2080,294,2240,147,2400,138.8C2560,131,2720,261,2880,285.8C3040,310,3200,229,3360,163.3C3520,98,3680,49,3840,32.7C4000,16,4160,33,4320,49C4480,65,4640,82,4800,130.7C4960,180,5120,261,5280,302.2C5440,343,5600,343,5760,334.8C5920,327,6080,310,6240,253.2C6400,196,6560,98,6720,106.2C6880,114,7040,229,7200,236.8C7360,245,7520,147,7680,106.2C7840,65,8000,82,8160,98C8320,114,8480,131,8640,138.8C8800,147,8960,147,9120,187.8C9280,229,9440,310,9600,302.2C9760,294,9920,196,10080,138.8C10240,82,10400,65,10560,73.5C10720,82,10880,114,11040,155.2C11200,196,11360,245,11440,269.5L11520,294L11520,490L11440,490C11360,490,11200,490,11040,490C10880,490,10720,490,10560,490C10400,490,10240,490,10080,490C9920,490,9760,490,9600,490C9440,490,9280,490,9120,490C8960,490,8800,490,8640,490C8480,490,8320,490,8160,490C8000,490,7840,490,7680,490C7520,490,7360,490,7200,490C7040,490,6880,490,6720,490C6560,490,6400,490,6240,490C6080,490,5920,490,5760,490C5600,490,5440,490,5280,490C5120,490,4960,490,4800,490C4640,490,4480,490,4320,490C4160,490,4000,490,3840,490C3680,490,3520,490,3360,490C3200,490,3040,490,2880,490C2720,490,2560,490,2400,490C2240,490,2080,490,1920,490C1760,490,1600,490,1440,490C1280,490,1120,490,960,490C800,490,640,490,480,490C320,490,160,490,80,490L0,490Z"></path></svg>
        
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
