import React, { useState } from 'react';

// export const UserContextProvider = ({children, ...props}) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState({});
//   return <UserContext.Provider value={{isLoggedIn, setIsLoggedIn, user, setUser}}>{children}</UserContext.Provider>;
// }

export const UserContext = React.createContext({isLoggedIn: true, user: {}});

