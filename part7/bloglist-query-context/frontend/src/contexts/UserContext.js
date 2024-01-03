import { createContext, useReducer } from 'react';

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET":
        return action.user;
    default:
      return state;
  }
};

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, false);

  const setUser = (user) => {
    userDispatch({ type: 'SET', user });
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
