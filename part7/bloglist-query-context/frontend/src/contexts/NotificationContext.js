import { createContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS":
        return { type: "success", message: action.message };
    case "ERROR":
      return { type: "error", message: action.message };
    case "INIT":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, false);

  const setNotification = (type, message, timeout = 5) => {
    notificationDispatch({ type, message });
    setTimeout(() => {
      notificationDispatch({ type: "INIT" });
    }, timeout * 1000);
  };

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };
