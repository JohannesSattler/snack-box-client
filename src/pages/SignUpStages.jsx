import React, {useState, useEffect} from 'react'
import InfoPersonal from '../components/InfoPersonal';
import { useNavigate } from "react-router-dom";
import * as CONFIG from '../config/config'

function SignUpStages(props) {
    const navigate = useNavigate()
    const [stage, setStage] = useState(props.user.signupStage)

    function handleStageSubmit() {
        setStage(stage+1)
    }

    return (
        <>
        {
            stage === 0 ? (
                <InfoPersonal onStageSubmit={handleStageSubmit} user={props.user}/>
            ) : (<></>)
        }
        {
            stage === 1 ? (
                <h1>This is SignUpStage 1</h1>
            ) : (<></>)
        }
        {
            stage === 2 ? (
                <h1>This is SignUpStage 2</h1>
            ) : (<></>)
        }
        {
            stage === 3 ? (
                <h1>This is SignUpStage 3</h1>
            ) : (<></>)
        }
        </>
    )
}

export default SignUpStages
