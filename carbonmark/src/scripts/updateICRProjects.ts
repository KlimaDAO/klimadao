import axios from 'axios'
import fs from 'fs'
import { PROJECT_INFO } from '../Projects'

require('dotenv').config()

type Project = [
  address: string,
  projectID: string,
  vintage: string,
  name: string,
  methodology: string,
  category: string,
  country: string
]

async function fetchCMSProject(registry: string, registryProjectId: string) {
  const { data } = await axios.post('https://l6of5nwi.apicdn.sanity.io/v1/graphql/production/default', {
    query: `
        query getCMSProject($registry: String!, $registryProjectId: String!) {
          allProject(
            where: {
              registry: { eq: $registry }
              registryProjectId: { eq: $registryProjectId }
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
      registryProjectId,
    },
  })

  return data.data.allProject[0]
}

async function updateMainnetICRProjects() {
  const updated_PROJECT_INFO: Project[] = [...PROJECT_INFO] as Project[]
  const updatedProjects: Project[] = []

  try {
    const { data } = await axios.get('https://api.carbonregistry.com/v0/public/projects/list', {
      headers: {
        Authorization: `Bearer ${process.env.ICR_MAINNET_API_KEY}`,
      },
    })

    const projects = data.projects

    for (const project of projects) {
      const serialization = project.carbonCredits[0].serialization
      const elements = serialization.split('-')
      const registry = 'ICR'
      const registryProjectId = elements[3]

      const cmsInfo = await fetchCMSProject(registry, registryProjectId)

      for (const credit of project.carbonCredits) {
        const newProject: Project = [
          project.projectContracts[0].address,
          registry + '-' + registryProjectId,
          credit.vintage,
          project.fullName,
          project.methodology.id,
          cmsInfo.methodologies[0].category,
          cmsInfo.country,
        ]

        updatedProjects.push(newProject)
      }
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
  }

  updatedProjects.forEach((project) => {
    updated_PROJECT_INFO.push(project)
  })

  const newFileContents = `export const PROJECT_INFO = ${JSON.stringify(updated_PROJECT_INFO, null, 2)};`

  fs.writeFileSync('src/Projects.ts', newFileContents, 'utf8')
}

updateMainnetICRProjects()
