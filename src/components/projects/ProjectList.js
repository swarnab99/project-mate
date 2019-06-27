import React from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom'

const ProjectList = ({projects}) => {
  // console.log(projects)

  return (
    <div className="project-list section">
      {/* If project available then show */}
      { projects && projects.map(project => {
        return (
          <Link to={`/project/${project.id}`} key={project.id} >
            <ProjectSummary project={project}  />
          </Link>
        )
      })}
    </div>
  )
}

export default ProjectList
