import {
  clearStore,
  test,
  afterAll,
  describe,
  createMockedFunction,
  newMockEvent,
  beforeEach,
  assert,
} from 'matchstick-as'
import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts'
import { Swap as SwapEvent } from '../generated/KLIMA_USDC/Pair'
import { handleSwap } from '../src/Pair'
// Helper function to create a Swap event
function newSwapEvent(
  address: Address,
  amount0In: BigInt,
  amount1In: BigInt,
  amount0Out: BigInt,
  amount1Out: BigInt,
  to: Address
): SwapEvent {
  let mockEvent = newMockEvent()
  let swapEvent = new SwapEvent(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  )
  swapEvent.address = address
  swapEvent.parameters = new Array()

  swapEvent.parameters.push(new ethereum.EventParam('amount0In', ethereum.Value.fromUnsignedBigInt(amount0In)))
  swapEvent.parameters.push(new ethereum.EventParam('amount1In', ethereum.Value.fromUnsignedBigInt(amount1In)))
  swapEvent.parameters.push(new ethereum.EventParam('amount0Out', ethereum.Value.fromUnsignedBigInt(amount0Out)))
  swapEvent.parameters.push(new ethereum.EventParam('amount1Out', ethereum.Value.fromUnsignedBigInt(amount1Out)))
  swapEvent.parameters.push(new ethereum.EventParam('to', ethereum.Value.fromAddress(to)))

  return swapEvent
}

describe('handleSwap', () => {
  beforeEach(() => {
    clearStore()
  })

  test('Initial swap updates pair price correctly', () => {
    let pairAddress = Address.fromString('0x1234567890123456789012345678901234567890')
    let toAddress = Address.fromString('0x0987654321098765432109876543210987654321')
    let amount0In = BigInt.fromI32(1000)
    let amount1In = BigInt.fromI32(2000)
    let amount0Out = BigInt.fromI32(0)
    let amount1Out = BigInt.fromI32(0)

    let swapEvent = newSwapEvent(pairAddress, amount0In, amount1In, amount0Out, amount1Out, toAddress)

    // Mock necessary contract methods
    createMockedFunction(pairAddress, 'getReserves', 'getReserves():(uint112,uint112,uint32)').returns([
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1000)),
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(2000)),
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1234567890)),
    ])

    handleSwap(swapEvent)

    // Assert that the pair price is updated correctly
    assert.fieldEquals('Pair', pairAddress.toHex(), 'currentprice', '2')
    assert.fieldEquals('Pair', pairAddress.toHex(), 'currentpricepertonne', '0.002')
  })

  test('Subsequent swap updates pair price correctly', () => {
    let pairAddress = Address.fromString('0x1234567890123456789012345678901234567890')
    let toAddress = Address.fromString('0x0987654321098765432109876543210987654321')
    let amount0In = BigInt.fromI32(500)
    let amount1In = BigInt.fromI32(1000)
    let amount0Out = BigInt.fromI32(0)
    let amount1Out = BigInt.fromI32(0)

    let swapEvent = newSwapEvent(pairAddress, amount0In, amount1In, amount0Out, amount1Out, toAddress)

    // Mock necessary contract methods
    createMockedFunction(pairAddress, 'getReserves', 'getReserves():(uint112,uint112,uint32)').returns([
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1500)),
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(3000)),
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1234567890)),
    ])

    handleSwap(swapEvent)

    // Assert that the pair price is updated correctly
    assert.fieldEquals('Pair', pairAddress.toHex(), 'currentprice', '2')
    assert.fieldEquals('Pair', pairAddress.toHex(), 'currentpricepertonne', '0.002')
  })
})
