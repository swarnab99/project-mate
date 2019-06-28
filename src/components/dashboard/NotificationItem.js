import React from 'react'
import moment from 'moment'

const NotificationItem = ({notifications}) => {
  return (
    <div>
      <ul className="collection with-header">
          { notifications && notifications.map(item => {
            return item.type === 'new_project' ? (
              // When new project is created
              <li className="collection-item avatar z-depth-1"  key={item.id} >
                <i className="material-icons circle green" style={{fontFamily: 'sans-serif'}}>{item.firstName[0] + item.lastName[0]}</i>
                <span className="title">{item.firstName} {item.lastName} created a project - "{item.projectTitle}"</span>
                <p className="text-mute">
                  { moment(item.time.toDate()).startOf('min').fromNow() }
                </p>
              </li>
              
            ) : (
              // When new user is joined
              <li className="collection-item avatar z-depth-1"  key={item.id} >
                <i className="material-icons circle green" style={{fontFamily: 'sans-serif'}}>{item.firstName[0] + item.lastName[0]}</i>
                <span className="title">{item.firstName} {item.lastName} joined - "Project Mate"</span>
                <p className="text-mute">
                  { moment(item.time.toDate()).startOf('min').fromNow() }
                </p>
              </li>
              
            )
          })
          }
        </ul>
    </div>
  )
}

export default NotificationItem
