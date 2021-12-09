import {useState, createContext } from 'react';
const UserContext = createContext();

function UserProvider(props) {
    const [user, setUser] = useState()

    const value = {
        user,
        setUser
    };
    return (
      <UserContext.Provider value={value}>
        {props.children}
      </UserContext.Provider>
    );
}

export {UserContext, UserProvider}