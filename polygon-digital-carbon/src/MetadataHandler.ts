import { Bytes, json, dataSource } from '@graphprotocol/graph-ts'
import { C3RetirementMetadata, C3MetadataProject } from '../generated/schema'

export function handleC3RetirementMetadata(content: Bytes): void {
  let c3RetirementMetadata = new C3RetirementMetadata(dataSource.stringParam())
  const value = json.fromBytes(content).toObject()
  if (value) {
    const transferee = value.get('transferee')
    const reason = value.get('reason')
    const projectId = value.get('projectId')
    const projectAddress = value.get('projectAddress')
    const amount = value.get('amount')
    const vintage = value.get('vintage')
    const owner = value.get('owner')
    const uncheckedProject = value.get('project')
    const image = value.get('image')
    const pdf = value.get('pdf')
    const nftRegistry = value.get('nftRegistry')

    if (transferee) c3RetirementMetadata.transferee = transferee.toString()
    if (reason) c3RetirementMetadata.reason = reason.toString()
    if (projectId) c3RetirementMetadata.projectId = projectId.toString()
    if (projectAddress) c3RetirementMetadata.projectAddress = Bytes.fromHexString(projectAddress.toString())
    if (amount) c3RetirementMetadata.amount = amount.toString()
    if (vintage) c3RetirementMetadata.vintage = vintage.toString()
    if (owner) c3RetirementMetadata.owner = Bytes.fromHexString(owner.toString())
    if (image) c3RetirementMetadata.image = image.toString()
    if (pdf) c3RetirementMetadata.pdf = pdf.toString()
    if (nftRegistry) c3RetirementMetadata.nftRegistry = nftRegistry.toString()

    if (uncheckedProject) {
      const project = uncheckedProject.toObject()
      let projectEntity = new C3MetadataProject(c3RetirementMetadata.id)
      const projectName = project.get('name')
      const project_id = project.get('project_id')
      const project_type = project.get('project_type')
      const registry = project.get('registry')
      const region = project.get('region')
      const country = project.get('country')
      const methodology = project.get('methodology')
      const period_start = project.get('period_start')
      const period_end = project.get('period_end')
      const ac = project.get('ac')
      const uri = project.get('uri')

      if (projectName) projectEntity.name = projectName.toString()
      if (project_id) projectEntity.project_id = project_id.toString()
      if (project_type) projectEntity.project_type = project_type.toString()
      if (registry) projectEntity.registry = registry.toString()
      if (region) projectEntity.region = region.toString()
      if (country) projectEntity.country = country.toString()
      if (methodology) projectEntity.methodology = methodology.toString()
      if (period_start) projectEntity.period_start = period_start.toString()
      if (period_end) projectEntity.period_end = period_end.toString()
      if (ac) projectEntity.ac = ac.toBool()
      if (uri) projectEntity.uri = uri.toString()

      projectEntity.save()
      c3RetirementMetadata.project = projectEntity.id
    }
  }
  c3RetirementMetadata.save()
}
