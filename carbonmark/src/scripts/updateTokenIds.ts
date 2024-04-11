import axios from 'axios'
import fs from 'fs'
import { PROJECT_INFO } from '../Projects'

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
      return [...project.slice(0, -2), foundExPost.tokenId, false]
    } else {
      const foundExAnte = exAntes.find((exAnte: ExAnte) => {
        const anteVintage = exAnte.serialization.split('-').pop()
        return exAnte.project.projectAddress.toLowerCase() === lowerCaseAddress && anteVintage === projectVintage
      })

      if (foundExAnte) {
        console.log(foundExAnte.tokenId, projectAddress, projectVintage)
        return [...project.slice(0, -2), foundExAnte.tokenId, true]
      }
    }

    // console.log(`no match: ${projectAddress} ${projectVintage}`);
    return [...project.slice(0, -2), '0', false]
  })

  const newFileContents = `import type { Project } from "./scripts/updateICRProjects" \nexport const PROJECT_INFO: Project[] = ${JSON.stringify(
    updatedProjects,
    null,
    2
  )};`

  fs.writeFileSync('../Projects.ts', newFileContents, 'utf8')
}

updateProjectsTokenIds()
