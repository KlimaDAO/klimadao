import axios from 'axios'
import fs from 'fs'
import { PROJECT_INFO } from '../Projects'

type Project = [
  address: string,
  projectID: string,
  vintage: string,
  name: string,
  methodology: string,
  category: string,
  country: string,
  tokenId: string
]

type ExPost = {
  tokenId: string
  vintage: string
  project: {
    projectAddress: string
  }
}

type ExAnte = {
  tokenId: string
  serialization: string
  project: {
    projectAddress: string
  }
}

async function fetchTokenIds() {
  const { data } = await axios.post('https://api.thegraph.com/subgraphs/name/skjaldbaka17/carbon-registry-polygon', {
    query: `
    {
      exPosts(first: 1000) {
        tokenId
        vintage
        project {
          projectAddress
        }
      }
      exAntes(first: 1000) {
        tokenId
        serialization
        project {
          projectAddress
        }
      }
    }
  
      `,
  })

  return {
    exPosts: data.data.exPosts,
    exAntes: data.data.exAntes,
  }
}

async function updateProjectsTokenIds() {
  const { exPosts, exAntes } = await fetchTokenIds()

  const updatedProjects = PROJECT_INFO.map((project) => {
    const [projectAddress, , projectVintage, ...rest] = project
    const lowerCaseAddress = projectAddress.toLowerCase()

    const foundExPost = exPosts.find(
      (exPost: ExPost) =>
        exPost.project.projectAddress.toLowerCase() === lowerCaseAddress && exPost.vintage === projectVintage
    )

    if (foundExPost) {
      return [...project.slice(0, -1), foundExPost.tokenId]
    } else {
      const foundExAnte = exAntes.find((exAnte: ExAnte) => {
        const anteVintage = exAnte.serialization.split('-').pop()
        return exAnte.project.projectAddress.toLowerCase() === lowerCaseAddress && anteVintage === projectVintage
      })

      if (foundExAnte) {
        return [...project.slice(0, -1), foundExAnte.tokenId]
      }
    }

    // console.log(`no match: ${projectAddress} ${projectVintage}`);
    return [...project.slice(0, -1), '0']
  })

  const newFileContents = `export const PROJECT_INFO = ${JSON.stringify(updatedProjects, null, 2)};`

  fs.writeFileSync('../Projects.ts', newFileContents, 'utf8')
}

updateProjectsTokenIds()
