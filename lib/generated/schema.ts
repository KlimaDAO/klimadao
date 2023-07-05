import { TypedMap, Entity, Value, ValueKind, store, Bytes, BigInt, BigDecimal } from '@graphprotocol/graph-ts'

export class Token extends Entity {
  constructor(id: Bytes) {
    super()
    this.set('id', Value.fromBytes(id))
  }

  save(): void {
    let id = this.get('id')
    assert(id != null, 'Cannot save Token entity without an ID')
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Token must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      )
      store.set('Token', id.toBytes().toHexString(), this)
    }
  }

  static load(id: Bytes): Token | null {
    return changetype<Token | null>(store.get('Token', id.toHexString()))
  }

  get id(): Bytes {
    let value = this.get('id')
    return value!.toBytes()
  }

  set id(value: Bytes) {
    this.set('id', Value.fromBytes(value))
  }

  get name(): string {
    let value = this.get('name')
    return value!.toString()
  }

  set name(value: string) {
    this.set('name', Value.fromString(value))
  }

  get symbol(): string {
    let value = this.get('symbol')
    return value!.toString()
  }

  set symbol(value: string) {
    this.set('symbol', Value.fromString(value))
  }

  get decimals(): i32 {
    let value = this.get('decimals')
    return value!.toI32()
  }

  set decimals(value: i32) {
    this.set('decimals', Value.fromI32(value))
  }

  get latestPriceUSD(): BigDecimal {
    let value = this.get('latestPriceUSD')
    return value!.toBigDecimal()
  }

  set latestPriceUSD(value: BigDecimal) {
    this.set('latestPriceUSD', Value.fromBigDecimal(value))
  }

  get latestPriceUSDUpdated(): BigInt {
    let value = this.get('latestPriceUSDUpdated')
    return value!.toBigInt()
  }

  set latestPriceUSDUpdated(value: BigInt) {
    this.set('latestPriceUSDUpdated', Value.fromBigInt(value))
  }

  get latestPricePerKLIMA(): BigDecimal {
    let value = this.get('latestPricePerKLIMA')
    return value!.toBigDecimal()
  }

  set latestPricePerKLIMA(value: BigDecimal) {
    this.set('latestPricePerKLIMA', Value.fromBigDecimal(value))
  }

  get latestPricePerKLIMAUpdated(): BigInt {
    let value = this.get('latestPricePerKLIMAUpdated')
    return value!.toBigInt()
  }

  set latestPricePerKLIMAUpdated(value: BigInt) {
    this.set('latestPricePerKLIMAUpdated', Value.fromBigInt(value))
  }
}
