import { ethereum } from '@graphprotocol/graph-ts'
import { PURO_PROJECT_INFO } from '../../../lib/utils/PuroProjectInfo'
import { VERRA_PROJECT_NAMES } from '../../../lib/utils/VerraProjectInfo'

import { CarbonProject } from '../../generated/schema'

export function loadOrCreateCarbonProject(
  registry: string,
  projectID: string,
  name: string = '',
  country: string = ''
): CarbonProject {
  let project = CarbonProject.load(projectID)
  if (project == null) {
    project = new CarbonProject(projectID)
    project.registry = registry
    project.projectID = projectID
    project.name = ''
    project.methodologies = ''
    project.category = ''
    project.country = ''
    project.region = ''

    // Set known values for Verra projects
    if (registry == 'VERRA') {
      for (let i = 0; i < VERRA_PROJECT_NAMES.length; i++) {
        if (projectID == VERRA_PROJECT_NAMES[i][0]) {
          project.name = VERRA_PROJECT_NAMES[i][1]
          project.country = VERRA_PROJECT_NAMES[i][2]
          break
        }
      }
    }

    if (registry == 'PURO_EARTH') {
      project.name = name
      project.country = country
    }

    project.save()
  }
  return project as CarbonProject
}
