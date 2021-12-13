import React from "react";
import "./Loading.css";
/* import Lottie from 'react-lottie';
import animationData from '../../assets/lotties/18033-box-open.json';
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}; */

const LoadingComponent = () => {

  return (
    <div className="wrapper">
      <div className="wrapper">
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;

