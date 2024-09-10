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
import { Address, BigInt, ethereum, store } from '@graphprotocol/graph-ts'
import { burnedCO2Token } from '../generated/CCO2/CCO2'
import { CarbonRetired } from '../generated/KlimaInfinity/KlimaInfinity'
import { handleCarbonRetired } from '../src/KlimaAggregator'
import { KLIMA_CARBON_RETIREMENTS_CONTRACT } from '../../lib/utils/Constants'
import { handleCCO2Retired } from '../src/TransferHandler'
import { loadOrCreateAccount } from '../src/utils/Account'
import { convertToAmountTonnes } from '../utils/helpers'

const cco2 = Address.fromString('0x82b37070e43c1ba0ea9e2283285b674ef7f1d4e2')

const senderAddress = Address.fromString('0x1234567890123456789012345678901234567890')

const beneficiaryAddress = Address.fromString('0x0987654321098765432109876543210987654321')

const retiredAmount = BigInt.fromString('1000000000000000000')

function newBurnedCO2TokenEvent(amount: BigInt): burnedCO2Token {
  let mockEvent = newMockEvent()

  let newBurnedCO2TokenEvent = new burnedCO2Token(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  )
  newBurnedCO2TokenEvent.parameters = new Array()

  let amountParam = new ethereum.EventParam('amount', ethereum.Value.fromUnsignedBigInt(amount))
  newBurnedCO2TokenEvent.parameters.push(amountParam)

  return newBurnedCO2TokenEvent
}

function createNewCarbonRetiredEvent(amount: BigInt): CarbonRetired {
  let mockEvent = newMockEvent()

  let newCarbonRetiredEvent = new CarbonRetired(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  )

  newCarbonRetiredEvent.parameters = new Array()

  let carbonBridgeParam = new ethereum.EventParam('carbonBridge', ethereum.Value.fromI32(1))
  let retiringAddressParam = new ethereum.EventParam(
    'retiringAddress',
    ethereum.Value.fromAddress(Address.fromString('0x1234567890123456789012345678901234567890'))
  )
  let retiringEntityStringParam = new ethereum.EventParam('retiringEntityString', ethereum.Value.fromString(''))
  let beneficiaryAddressParam = new ethereum.EventParam(
    'beneficiaryAddress',
    ethereum.Value.fromAddress(beneficiaryAddress)
  )
  let beneficiaryStringParam = new ethereum.EventParam('beneficiaryString', ethereum.Value.fromString('Beneficiary'))
  let retirementMessageParam = new ethereum.EventParam(
    'retirementMessage',
    ethereum.Value.fromString('Retirement Message')
  )
  let carbonPoolParam = new ethereum.EventParam('carbonPool', ethereum.Value.fromAddress(cco2))
  let carbonTokenParam = new ethereum.EventParam('carbonToken', ethereum.Value.fromAddress(cco2))
  let retiredAmountParam = new ethereum.EventParam('retiredAmount', ethereum.Value.fromUnsignedBigInt(amount))

  newCarbonRetiredEvent.parameters.push(carbonBridgeParam)
  newCarbonRetiredEvent.parameters.push(retiringAddressParam)
  newCarbonRetiredEvent.parameters.push(retiringEntityStringParam)
  newCarbonRetiredEvent.parameters.push(beneficiaryAddressParam)
  newCarbonRetiredEvent.parameters.push(beneficiaryStringParam)
  newCarbonRetiredEvent.parameters.push(retirementMessageParam)
  newCarbonRetiredEvent.parameters.push(carbonPoolParam)
  newCarbonRetiredEvent.parameters.push(carbonTokenParam)
  newCarbonRetiredEvent.parameters.push(retiredAmountParam)

  return newCarbonRetiredEvent
}

describe('Carbon Retired Tests', () => {
  beforeEach(() => {
    clearStore()

    createMockedFunction(cco2, 'projectName', 'projectName():(string)').returns([
      ethereum.Value.fromString('CCO2 Project'),
    ])

    createMockedFunction(
      KLIMA_CARBON_RETIREMENTS_CONTRACT,
      'retirements',
      'retirements(address):(uint256,uint256,uint256)'
    )
      .withArgs([ethereum.Value.fromAddress(senderAddress)])
      .returns([
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(100)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1234567890)),
      ])

    createMockedFunction(
      KLIMA_CARBON_RETIREMENTS_CONTRACT,
      'retirements',
      'retirements(address):(uint256,uint256,uint256)'
    )
      .withArgs([ethereum.Value.fromAddress(beneficiaryAddress)])
      .returns([
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(0)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(0)),
      ])
  })

  afterAll(() => {
    clearStore()
  })

  test('handleCarbonRetired: CCO2', () => {
    let sender = loadOrCreateAccount(senderAddress)

    let burnedCO2TokenEvent = newBurnedCO2TokenEvent(retiredAmount)
    burnedCO2TokenEvent.transaction.from = senderAddress

    handleCCO2Retired(burnedCO2TokenEvent)

    let carbonRetiredEvent = createNewCarbonRetiredEvent(retiredAmount)
    carbonRetiredEvent.transaction.from = senderAddress

    handleCarbonRetired(carbonRetiredEvent)

    const retiringAddress = carbonRetiredEvent.parameters[1].value.toAddress()
    const retiringEntityString = carbonRetiredEvent.parameters[2].value.toString()
    const beneficiaryAddress = carbonRetiredEvent.parameters[3].value.toAddress()
    const beneficiaryString = carbonRetiredEvent.parameters[4].value.toString()
    const retirementMessage = carbonRetiredEvent.parameters[5].value.toString()
    const carbonPool = carbonRetiredEvent.parameters[6].value.toAddress()
    const carbonToken = carbonRetiredEvent.parameters[7].value.toAddress()
    const retiredAmountTotal = carbonRetiredEvent.parameters[8].value.toBigInt()

    sender = loadOrCreateAccount(senderAddress)
    const beneficiary = loadOrCreateAccount(beneficiaryAddress)
    const retireId = sender.id.concatI32(sender.totalRetirements - 1).toHexString()
    const klimaRetireId = beneficiaryAddress.concatI32(beneficiary.totalRetirements).toHexString()

    assert.fieldEquals('KlimaRetire', klimaRetireId, 'retire', retireId)
    assert.fieldEquals('KlimaRetire', klimaRetireId, 'index', '0')
    assert.fieldEquals('KlimaRetire', klimaRetireId, 'feeAmount', '10000000000000000')
    assert.fieldEquals('KlimaRetire', klimaRetireId, 'specific', 'false')

    assert.fieldEquals('Retire', retireId, 'credit', carbonToken.toHexString())
    assert.fieldEquals('Retire', retireId, 'pool', carbonPool.toHexString())
    assert.fieldEquals('Retire', retireId, 'source', 'KLIMA')
    assert.fieldEquals('Retire', retireId, 'amount', retiredAmount.toString())
    assert.fieldEquals('Retire', retireId, 'amountTonnes', convertToAmountTonnes(carbonToken, retiredAmount).toString())
    assert.fieldEquals('Retire', retireId, 'beneficiaryAddress', beneficiaryAddress.toHexString())
    assert.fieldEquals('Retire', retireId, 'beneficiaryName', beneficiaryString)
    assert.fieldEquals('Retire', retireId, 'retirementMessage', retirementMessage)
    assert.fieldEquals('Retire', retireId, 'retiringAddress', retiringAddress.toHexString())
    assert.fieldEquals('Retire', retireId, 'retiringName', retiringEntityString)

    clearStore()
  })
})
