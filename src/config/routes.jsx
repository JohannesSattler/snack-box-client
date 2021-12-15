import { Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/LogIn";
import Signup from "../pages/Signup";
import ProtectedPage from "../pages/ProtectedPage";
import ProductPage from "../pages/ProductPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import SignUpStages from "../pages/SignUpStages";
import SubscriptionPage from "../pages/SubscriptionPage";
import SubscriptionDetailPage from "../pages/SubscriptionDetailPage";
import OrdersPage from "../pages/OrdersPage";
import ProfilePage from '../pages/ProfilePage';
import CheckoutPage from '../pages/CheckoutPage';
import VerifyEmail from '../pages/VerifyEmail'
import NewsLetterDelete from '../pages/NewsLetterDelete'

import '../pages/landingpage.css'

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
      path: PATHS.SIGNUPSTAGES,
      element: <SignUpStages {...props} />
    },
    {
      path: PATHS.SIGNUPSTAGES,
      element: <SignUpStages {...props} />
    },
    {
      path: PATHS.SIGNUPSTAGES,
      element: <SignUpStages {...props} />
    },
    {
      path: PATHS.SIGNUPSTAGES,
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
      path: PATHS.PRODUCTS,
      element: <ProductPage {...props} />,
    },
    {
      path: PATHS.PRODUCTDETAIL,
      element: <ProductDetailPage {...props} />,
    },
    {
      path: PATHS.SUBSCRIPTIONS,
      element: <SubscriptionPage {...props} />,
    },
    {
      path: PATHS.SUBSCRIPTIONDETAIL,
      element: <SubscriptionDetailPage {...props} />,
    },
    {
      path: PATHS.ORDERS,
      element: <OrdersPage {...props} />,
    },
    {
      path: PATHS.PROFILE,
      element: <ProfilePage {...props} />,
    },
    {
      path: PATHS.CHECKOUT,
      element: user?.isVerified ? (<CheckoutPage {...props} />) : (<VerifyEmail tryVerify={false}/>),
    },
    {
      path: PATHS.VERIFYEMAIL,
      element: <VerifyEmail tryVerify={true}/>,
    },
    {
      path: PATHS.DELETENEWSLETTER,
      element: <NewsLetterDelete/>,
    },
  ];
};

export default routes;
