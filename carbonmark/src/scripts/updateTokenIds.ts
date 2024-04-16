import axios from 'axios'
import fs from 'fs'
import { PROJECT_INFO } from '../Projects'
import { ProjectInfo } from './types'

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

function convertToProjectInfo(data: any[]): ProjectInfo[] {
  return data.map(
    (item) => new ProjectInfo(item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8])
  )
}

async function updateProjectsTokenIds() {
  const { exPosts, exAntes } = await fetchTokenIds();
  const projectInfoArray = convertToProjectInfo(PROJECT_INFO);

  const updatedProjects = projectInfoArray.map((project) => {
      const lowerCaseAddress = project.address.toLowerCase();
      const foundExPost = exPosts.find(exPost =>
          exPost.project.projectAddress.toLowerCase() === lowerCaseAddress && exPost.vintage === project.vintage
      );

      if (foundExPost) {
          return new ProjectInfo(
              project.address,
              project.projectId,
              project.vintage,
              project.name,
              project.methodology,
              project.category,
              project.country,
              foundExPost.tokenId,
              false
          );
      }

      const foundExAnte = exAntes.find(exAnte => {
          const anteVintage = exAnte.serialization.split('-').pop();
          return exAnte.project.projectAddress.toLowerCase() === lowerCaseAddress && anteVintage === project.vintage;
      });

      if (foundExAnte) {
          return new ProjectInfo(
              project.address,
              project.projectId,
              project.vintage,
              project.name,
              project.methodology,
              project.category,
              project.country,
              foundExAnte.tokenId,
              true
          );
      }

      return project; 
  });


  const importStatement = 'import { ProjectInfo } from "./scripts/types";\n';
  const arrayDeclaration = 'export const PROJECT_INFO_TEST: ProjectInfo[] = [\n';
  const projectInstances = updatedProjects.map(project =>
      `    new ProjectInfo('${project.address}', '${project.projectId}', '${project.vintage}', '${project.name}', '${project.methodology}', '${project.category}', '${project.country}', '${project.tokenId}', ${project.isExAnte})`
  ).join(',\n');
  const closingBracket = '\n];';

  const finalContent = importStatement + arrayDeclaration + projectInstances + closingBracket;

  fs.writeFile('../ProjectsTEST.ts', finalContent, 'utf8', err => {
      if (err) return console.error('Failed to write file:', err);
      console.log('Project info updated and saved successfully!');
  });
}

updateProjectsTokenIds()
