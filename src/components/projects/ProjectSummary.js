import React from 'react'
import moment from 'moment'

const ProjectSummary = ({project}) => {
  // console.log(project)
  const { title, authorFirstName, authorLastName, createdAt } = project;
  return (
    <div className="card z-depth-1 project-summary">
      <div className="card-content grey-text text-darken-3">
        <div className="card-title">{title}</div>
        <p>Created by {authorFirstName} {authorLastName}</p>
        <p className="gray-text">{ moment(createdAt.toDate()).startOf('min').fromNow() }</p>
      </div>
    </div>
  )
}

export default ProjectSummary
