import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import * as CONFIG from '../config/config'
import { UserContext } from "../context/UserContext";

import InfoPersonal from '../components/SignUpStages/InfoPersonal';
import InfoSnacks from '../components/SignUpStages/InfoSnacks';
import InfoPayment from '../components/SignUpStages/InfoPayment';
import InfoSubscription from '../components/SignUpStages/InfoSubscription';

function SignUpStages(props) {
    const {user, setUser} = useContext(UserContext)
    
    return (
        <div style={{marginTop: '200px'}}>
        {
            user.signupStage === 0 ? (
                <InfoPersonal/>
            ) : (<></>)
        }
        {
            user.signupStage === 1 ? (
                <InfoSnacks/>
            ) : (<></>)
        }
        {
            user.signupStage === 2 ? (
                <InfoPayment/>
            ) : (<></>)
        }
        {
            user.signupStage === 3 ? (
                <InfoSubscription/>
            ) : (<></>)
        }
        </div>
    )
}

export default SignUpStages
