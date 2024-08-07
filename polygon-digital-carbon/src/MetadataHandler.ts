import { Bytes, json, dataSource, JSONValueKind, log } from '@graphprotocol/graph-ts'
import { C3RetirementMetadata, C3MetadataProject } from '../generated/schema'

export function handleC3RetirementMetadata(content: Bytes): void {
  let c3RetirementMetadata = new C3RetirementMetadata(dataSource.stringParam())
  const rawValue = json.try_fromBytes(content)

  if (!rawValue.value.isNull()) {
    const value = rawValue.value.toObject()
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

    if (transferee && transferee.kind == JSONValueKind.STRING) {
      c3RetirementMetadata.transferee = transferee.toString()
    } else if (transferee) {
      log.error('Invalid transferee value. ipfs hash {}', [content.toHexString()])
    }

    if (reason && reason.kind == JSONValueKind.STRING) {
      c3RetirementMetadata.reason = reason.toString()
    } else if (reason) {
      log.error('Invalid reason value. ipfs hash {}', [content.toHexString()])
    }

    if (projectId && projectId.kind == JSONValueKind.STRING) {
      c3RetirementMetadata.projectId = projectId.toString()
    } else if (projectId) {
      log.error('Invalid projectId value. ipfs hash {}', [content.toHexString()])
    }

    if (projectAddress && projectAddress.kind == JSONValueKind.STRING) {
      c3RetirementMetadata.projectAddress = projectAddress.toString()
    } else if (projectAddress) {
      log.error('Invalid projectAddress value. ipfs hash {}', [content.toHexString()])
    }

    if (amount) {
      if (amount.kind == JSONValueKind.STRING || amount.kind == JSONValueKind.NUMBER) {
        const stringAmount = amount.toString()
        c3RetirementMetadata.amount = stringAmount
      } else {
        log.error('Invalid amount value. ipfs hash {}', [content.toHexString()])
      }
    }

    if (vintage && vintage.kind == JSONValueKind.STRING) {
      c3RetirementMetadata.vintage = vintage.toString()
    } else if (vintage) {
      log.error('Invalid vintage value. ipfs hash {}', [content.toHexString()])
    }

    if (owner && owner.kind == JSONValueKind.STRING) {
      c3RetirementMetadata.owner = owner.toString()
    } else if (owner) {
      log.error('Invalid owner value. ipfs hash {}', [content.toHexString()])
    }

    if (image && image.kind == JSONValueKind.STRING) {
      c3RetirementMetadata.image = image.toString()
    } else if (image) {
      log.error('Invalid image value. ipfs hash {}', [content.toHexString()])
    }

    if (pdf && pdf.kind == JSONValueKind.STRING) {
      c3RetirementMetadata.pdf = pdf.toString()
    } else if (pdf) {
      log.error('Invalid pdf value. ipfs hash {}', [content.toHexString()])
    }

    if (nftRegistry && nftRegistry.kind == JSONValueKind.STRING) {
      c3RetirementMetadata.nftRegistry = nftRegistry.toString()
    } else if (nftRegistry) {
      log.error('Invalid nftRegistry value. ipfs hash {}', [content.toHexString()])
    }

    if (uncheckedProject && uncheckedProject.kind == JSONValueKind.OBJECT) {
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

      if (projectName && projectName.kind == JSONValueKind.STRING) {
        projectEntity.name = projectName.toString()
      } else if (projectName) {
        log.error('Invalid projectName value. ipfs hash {}', [content.toHexString()])
      }

      if (project_id && project_id.kind == JSONValueKind.STRING) {
        projectEntity.project_id = project_id.toString()
      } else if (project_id) {
        log.error('Invalid project_id value. ipfs hash {}', [content.toHexString()])
      }

      if (project_type && project_type.kind == JSONValueKind.STRING) {
        projectEntity.project_type = project_type.toString()
      } else if (project_type) {
        log.error('Invalid project_type value. ipfs hash {}', [content.toHexString()])
      }

      if (registry && registry.kind == JSONValueKind.STRING) {
        projectEntity.registry = registry.toString()
      } else if (registry) {
        log.error('Invalid registry value. ipfs hash {}', [content.toHexString()])
      }

      if (region && region.kind == JSONValueKind.STRING) {
        projectEntity.region = region.toString()
      } else if (region) {
        log.error('Invalid region value. ipfs hash {}', [content.toHexString()])
      }

      if (country && country.kind == JSONValueKind.STRING) {
        projectEntity.country = country.toString()
      } else if (country) {
        log.error('Invalid country value. ipfs hash {}', [content.toHexString()])
      }

      if (methodology && methodology.kind == JSONValueKind.STRING) {
        projectEntity.methodology = methodology.toString()
      } else if (methodology) {
        log.error('Invalid methodology value. ipfs hash {}', [content.toHexString()])
      }

      if (period_start && period_start.kind == JSONValueKind.STRING) {
        projectEntity.period_start = period_start.toString()
      } else if (period_start) {
        log.error('Invalid period_start value. ipfs hash {}', [content.toHexString()])
      }

      if (period_end && period_end.kind == JSONValueKind.STRING) {
        projectEntity.period_end = period_end.toString()
      } else if (period_end) {
        log.error('Invalid period_end value. ipfs hash {}', [content.toHexString()])
      }

      if (ac && ac.kind == JSONValueKind.BOOL) {
        projectEntity.ac = ac.toBool()
      } else if (ac) {
        log.error('Invalid ac value. ipfs hash {}', [content.toHexString()])
      }

      if (uri && uri.kind == JSONValueKind.STRING) {
        projectEntity.uri = uri.toString()
      } else if (uri) {
        log.error('Invalid uri value. ipfs hash {}', [content.toHexString()])
      }

      projectEntity.save()
      c3RetirementMetadata.project = projectEntity.id
    } else if (uncheckedProject) {
      log.error('Invalid uncheckedProject value. ipfs hash {}', [content.toHexString()])
    }
  }
  c3RetirementMetadata.save()
}
