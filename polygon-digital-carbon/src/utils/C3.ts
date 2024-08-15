import { BigInt, Bytes } from '@graphprotocol/graph-ts'
import { C3RetireRequestDetails } from '../../generated/schema'

export function loadOrCreateC3RetireRequestDetails(requestId: Bytes): C3RetireRequestDetails {
  let request = C3RetireRequestDetails.load(requestId)

  if (request == null) {
    request = new C3RetireRequestDetails(requestId)
    request.index = BigInt.fromI32(0)
    request.c3OffsetNftIndex = BigInt.fromI32(0)
    request.tokenURI = ''
    request.save()
  }

  return request
}

export function loadC3RetireRequestDetails(requestId: Bytes): C3RetireRequestDetails | null {
  let request = C3RetireRequestDetails.load(requestId)
  return request
}
