import { ICRProjectToken } from '../../generated/templates'
import { ProjectCreated } from '../../generated/ICRCarbonContractRegistry/ICRCarbonContractRegistry'
import { loadOrCreateCarbonCredit } from '../utils/CarbonCredit'
import { loadOrCreateCarbonProject } from '../utils/CarbonProject'
import { Address, BigInt, log } from '@graphprotocol/graph-ts'
import { ICR_PROJECT_INFO } from '../../../lib/utils/ICRProjectInfo'
import { createICRTokenWithCall } from '../utils/Token'

export function handleNewICC(event: ProjectCreated): void {
  // Start indexing the C3T tokens; `event.params.tokenAddress` is the
  // address of the new token contract

  const projectAddress = event.params.projectAddress

  ICRProjectToken.create(projectAddress)

  let project = loadOrCreateCarbonProject('ICR', event.params.projectId.toString())

  for (let i = 0; i < ICR_PROJECT_INFO.length; i++) {
    if (projectAddress.toHexString().toLowerCase() == ICR_PROJECT_INFO[i][0]) {
      project.id = ICR_PROJECT_INFO[i][1]
      project.projectID = ICR_PROJECT_INFO[i][1]
      project.name = ICR_PROJECT_INFO[i][2]
      project.methodologies = ICR_PROJECT_INFO[i][3]
      project.category = ICR_PROJECT_INFO[i][4]
      project.country = ICR_PROJECT_INFO[i][5]
      break
    }
  }
  project.save()

  // Load a default credit with ID 0 for future use
  let credit = loadOrCreateCarbonCredit(projectAddress, 'ICR', BigInt.fromI32(0))
  credit.project = project.id

  log.info('Created new ICR Project Datasource', [])
  credit.save()
}
