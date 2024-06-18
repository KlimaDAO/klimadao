import axios from 'axios'
import fs from 'fs'
import { PROJECT_INFO } from '../Projects'
import { ProjectInfo } from './types'

require('dotenv').config()

async function fetchCMSProject(registry: string) {
  const { data } = await axios.post('https://l6of5nwi.apicdn.sanity.io/v1/graphql/production/default', {
    query: `
        query getCMSProject($registry: String!) {
          allProject(
            where: {
              registry: { eq: $registry }
            }
          ) {
            country
            description
            id: _id
            geolocation {
              lat
              lng
              alt
            }
            methodologies {
              id: _id
              category
              name
            }
            name
            region
            registry
            url
            registryProjectId
          }
        }
      `,
    variables: {
      registry,
    },
  })

  return data.data.allProject
}

async function updatePuroProjects() {
  const updated_PROJECT_INFO = [...PROJECT_INFO]
  const updatedProjects: ProjectInfo[] = []
  const registry = 'PUR'

  const cmsInfo = await fetchCMSProject(registry)

  for (const project of cmsInfo) {
    for (let i = 2010; i < 2031; i++) {
      const newProject = new ProjectInfo(
        project.projectContracts?.[0]?.address || '',
        registry + '-' + project.registryProjectId,
        i.toString(),
        project.name,
        project.methodologies?.[0]?.id || '',
        project.methodologies?.[0]?.category || '',
        project.country,
        '0',
        false
      )
      updatedProjects.push(newProject)
    }
  }

  updatedProjects.forEach((project) => {
    updated_PROJECT_INFO.push(project)
  })

    console.log(updated_PROJECT_INFO)   
  //   const newFileContents = `export const PROJECT_INFO = ${JSON.stringify(updated_PROJECT_INFO, null, 2)};`

  //   fs.writeFileSync('src/Projects.ts', newFileContents, 'utf8')
}

updatePuroProjects()
