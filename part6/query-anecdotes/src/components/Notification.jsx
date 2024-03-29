import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'

const Notification = () => {
  const notification = useContext(NotificationContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!notification.notification) return null
console.log(notification)
  return (
    <div style={style}>
      {notification.notification}
    </div>
  )
}

export default Notification
