import { C3ProjectToken } from '../../generated/templates'
import { NewTokenProject } from '../../generated/C3ProjectTokenFactory/C3ProjectTokenFactory'

export function handleNewC3T(event: NewTokenProject): void {
  // Start indexing the C3T tokens; `event.params.tokenAddress` is the
  // address of the new token contract
  C3ProjectToken.create(event.params.tokenAddress)
}
