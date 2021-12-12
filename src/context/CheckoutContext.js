import {useState, createContext } from 'react';
const CheckoutContext = createContext();

function CheckoutProvider(props) {
    const [checkoutItems, setCheckoutItems] = useState()
    const [total, setTotal] = useState(0)

    const value = {
        checkoutItems,
        setCheckoutItems,
        total,
        setTotal
    };

    return (
      <CheckoutContext.Provider value={value}>
        {props.children}
      </CheckoutContext.Provider>
    );
}

export {CheckoutContext, CheckoutProvider}