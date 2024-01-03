import { useContext } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'

const Notification = () => {
  const { notification, setNotification } = useContext(NotificationContext);
  if (notification === null || notification.message === "") {
    return null;
  }

  return <div className={notification.type}>{notification.message}</div>;
};

export default Notification;
