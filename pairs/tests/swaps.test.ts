import {
  clearStore,
  test,
  afterAll,
  describe,
  createMockedFunction,
  newMockEvent,
  beforeEach,
  assert,
  log,
} from 'matchstick-as'
import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts'
import { Swap as SwapEvent } from '../generated/KLIMA_USDC/Pair'
import { handleSwap } from '../src/Pair'
import {
  CCO2_ERC20_CONTRACT,
  KLIMA_CCO2_PAIR,
  KLIMA_ERC20_V1_CONTRACT,
  KLIMA_USDC_PAIR,
  TREASURY_ADDRESS,
} from '../../lib/utils/Constants'
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

  swapEvent.parameters.push(new ethereum.EventParam('sender', ethereum.Value.fromAddress(to)))
  swapEvent.parameters.push(new ethereum.EventParam('amount0In', ethereum.Value.fromUnsignedBigInt(amount0In)))
  swapEvent.parameters.push(new ethereum.EventParam('amount1In', ethereum.Value.fromUnsignedBigInt(amount1In)))
  swapEvent.parameters.push(new ethereum.EventParam('amount0Out', ethereum.Value.fromUnsignedBigInt(amount0Out)))
  swapEvent.parameters.push(new ethereum.EventParam('amount1Out', ethereum.Value.fromUnsignedBigInt(amount1Out)))
  swapEvent.parameters.push(new ethereum.EventParam('to', ethereum.Value.fromAddress(to)))

  return swapEvent
}

const pairAddress = KLIMA_CCO2_PAIR

describe('handleSwap', () => {
  beforeEach(() => {
    createMockedFunction(KLIMA_USDC_PAIR, 'getReserves', 'getReserves():(uint112,uint112,uint32)').returns([
      ethereum.Value.fromUnsignedBigInt(BigInt.fromString('23211174326211')),
      ethereum.Value.fromUnsignedBigInt(BigInt.fromString('2518999568458520093807838')),
      ethereum.Value.fromUnsignedBigInt(BigInt.fromString('1725456599')),
    ])

    // set token0 to KLIMA and mock the name, symbol and decimals
    createMockedFunction(KLIMA_CCO2_PAIR, 'token0', 'token0():(address)').returns([
      ethereum.Value.fromAddress(KLIMA_ERC20_V1_CONTRACT),
    ])

    createMockedFunction(KLIMA_ERC20_V1_CONTRACT, 'name', 'name():(string)').returns([
      ethereum.Value.fromString('KLIMA'),
    ])

    createMockedFunction(KLIMA_ERC20_V1_CONTRACT, 'symbol', 'symbol():(string)').returns([
      ethereum.Value.fromString('KLIMA'),
    ])

    createMockedFunction(KLIMA_ERC20_V1_CONTRACT, 'decimals', 'decimals():(uint8)').returns([
      ethereum.Value.fromI32(18),
    ])

    // set token1 to CCO2 and mock the name, symbol and decimals

    createMockedFunction(KLIMA_CCO2_PAIR, 'token1', 'token1():(address)').returns([
      ethereum.Value.fromAddress(CCO2_ERC20_CONTRACT),
    ])

    createMockedFunction(CCO2_ERC20_CONTRACT, 'name', 'name():(string)').returns([ethereum.Value.fromString('CCO2')])

    createMockedFunction(CCO2_ERC20_CONTRACT, 'symbol', 'symbol():(string)').returns([
      ethereum.Value.fromString('CCO2'),
    ])

    createMockedFunction(CCO2_ERC20_CONTRACT, 'decimals', 'decimals():(uint8)').returns([ethereum.Value.fromI32(18)])

    // set total supply and balance of to address
    createMockedFunction(KLIMA_CCO2_PAIR, 'totalSupply', 'totalSupply():(uint256)').returns([
      ethereum.Value.fromUnsignedBigInt(BigInt.fromString('7645055334322312917')),
    ])

    createMockedFunction(KLIMA_CCO2_PAIR, 'balanceOf', 'balanceOf(address):(uint256)')
      .withArgs([ethereum.Value.fromAddress(TREASURY_ADDRESS)])
      .returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(0))])

    createMockedFunction(KLIMA_CCO2_PAIR, 'getReserves', 'getReserves():(uint112,uint112,uint32)').returns([
      ethereum.Value.fromUnsignedBigInt(BigInt.fromString('23211174326211')),
      ethereum.Value.fromUnsignedBigInt(BigInt.fromString('2518999568458520093807838')),
      ethereum.Value.fromUnsignedBigInt(BigInt.fromString('1725456599')),
    ])

    // mock cco2 contract calls

    createMockedFunction(CCO2_ERC20_CONTRACT, 'decimalRatio', 'decimalRatio():(uint256)').returns([
      ethereum.Value.fromUnsignedBigInt(BigInt.fromString('10000')),
    ])

    createMockedFunction(CCO2_ERC20_CONTRACT, 'burningPercentage', 'burningPercentage():(uint256)').returns([
      ethereum.Value.fromUnsignedBigInt(BigInt.fromString('20')),
    ])
  })

  test('Initial swap updates pair price correctly', () => {
    let toAddress = Address.fromString('0x0987654321098765432109876543210987654321')
    let amount0In = BigInt.fromI32(1000)
    let amount1In = BigInt.fromI32(0)
    let amount0Out = BigInt.fromI32(0)
    let amount1Out = BigInt.fromI32(2000000000)

    let swapEvent = newSwapEvent(pairAddress, amount0In, amount1In, amount0Out, amount1Out, toAddress)

    handleSwap(swapEvent)

    // Assert that the pair price is updated correctly
    assert.fieldEquals('Pair', pairAddress.toHex(), 'currentprice', '0.01846581475982910603740163507456394')
    assert.fieldEquals(
      'Pair',
      pairAddress.toHex(),
      'currentpricepertonne',
      '18.46581475982910603740163507456394'
    )
  })

  test('Subsequent swap updates pair price correctly', () => {
    let toAddress = Address.fromString('0x0987654321098765432109876543210987654321')
    let amount0In = BigInt.fromI32(1000)
    let amount1In = BigInt.fromI32(0)
    let amount0Out = BigInt.fromI32(0)
    let amount1Out = BigInt.fromI32(500000000)

    let swapEvent = newSwapEvent(pairAddress, amount0In, amount1In, amount0Out, amount1Out, toAddress)

    handleSwap(swapEvent)

    // Assert that the pair price is updated correctly
    assert.fieldEquals('Pair', pairAddress.toHex(), 'currentprice', '0.004616453689957276509350408768640985')
    assert.fieldEquals('Pair', pairAddress.toHex(), 'currentpricepertonne', '4.616453689957276509350408768640985')
  })
})
