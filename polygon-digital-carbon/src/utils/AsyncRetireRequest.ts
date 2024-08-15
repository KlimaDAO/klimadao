import { Bytes } from '@graphprotocol/graph-ts'
import { AsyncRetireRequest } from '../../generated/schema'
import { AsyncRetireRequestStatus } from '../../utils/enums'

export function loadOrCreateAsyncRetireRequest(requestId: Bytes): AsyncRetireRequest {
  let request = AsyncRetireRequest.load(requestId)
  if (request == null) {
    request = new AsyncRetireRequest(requestId)
    request.retire = new Bytes(0)
    request.status = AsyncRetireRequestStatus.AWAITING
    request.save()
  }
  return request as AsyncRetireRequest
}

export function loadAsyncRetireRequest(requestId: Bytes): AsyncRetireRequest {
  let request = AsyncRetireRequest.load(requestId)

  return request as AsyncRetireRequest
}
