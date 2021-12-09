import { Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/LogIn";
import Signup from "../pages/Signup";
import ProtectedPage from "../pages/ProtectedPage";
import ProductPage from "../pages/ProductPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import SignUpStages from "../pages/SignUpStages";
import * as PATHS from "../utils/paths";
import * as CONFIG from '../config/config'

const routes = (props) => {
  const { user } = props;
  return [
    {
      path: PATHS.HOMEPAGE,
      element: user ? 
        (<HomePage {...props} />)
        : 
        (<LandingPage {...props} />),
    },
    {
      path: PATHS.SIGNUPPAGE,
      element: <Signup {...props} />,
    },
    {
      path: PATHS.SIGNUPPERSONAL,
      element: <SignUpStages {...props} />
    },
    {
      path: PATHS.LOGINPAGE,
      element: <Login {...props} />,
    },
    {
      path: PATHS.PROTECTEDPAGE,
      element: user ? (
        <ProtectedPage {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      ),
    },
    {
      path: PATHS.PLANS,
      element: <HomePage {...props} />,
    },
    {
      path: PATHS.PRODUCTS,
      element: <ProductPage {...props} />,
    },
    {
      path: PATHS.PRODUCTDETAIL,
      element: <ProductDetailPage {...props} />,
    },
  ];
};

export default routes;
