import { Address } from '@graphprotocol/graph-ts'
import { Ecosystem } from '../../generated/schema'

export function loadOrCreateEcosystem(): Ecosystem {
  let ecosystem = Ecosystem.load('0')
  if (ecosystem == null) {
    ecosystem = new Ecosystem('0')
    ecosystem.activeCredits = []
    ecosystem.save()
  }
  return ecosystem
}
