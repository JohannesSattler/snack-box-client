import React, {useEffect, useState} from 'react'
import Loading from '../components/Loading/index'
import SubscriptionCard from '../components/SubscriptionCard'
import axios from 'axios'

function SubscriptionPage() {
    const [subscriptions, setSubscriptions] = useState([])

    useEffect(() => {
        (async() => {
            const base = process.env.REACT_APP_API_BASE_URL
            const response = await axios.get(base + '/subscriptions')
            setSubscriptions(response.data)
        })()
    }, [])
    
    if(!subscriptions.length) {
        return <Loading></Loading>
    } 

    return (
        <div 
        style={{
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                alignItems: 'flex-start',
                width: '80%', 
                margin: '0 auto',
                height: '100%'
            }}
        >
            {
                subscriptions.map(subscription => {
                    return <SubscriptionCard subscription={subscription}/>
                })
            }
        </div>
    )
}

export default SubscriptionPage
