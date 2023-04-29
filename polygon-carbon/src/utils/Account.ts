import { Address } from '@graphprotocol/graph-ts'
import { Account } from '../../generated/schema'

export function loadOrCreateAccount(accountAddress: Address): Account {
  let account = Account.load(accountAddress)
  if (account) return account as Account

  account = new Account(accountAddress)
  account.save()
  return account as Account
}
