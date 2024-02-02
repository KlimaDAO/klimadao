import { ListingCancelled, ListingCreated, ListingFilled, ListingUpdated } from '../generated/Carbonmark/Carbonmark'
import {
  loadOrCreateActivity,
  loadOrCreateListing,
  loadOrCreateProject,
  loadOrCreatePurchase,
  loadOrCreateUser,
} from './Entities'
import { ZERO_BI } from '../../lib/utils/Decimals'
import { ZERO_ADDRESS } from '../../lib/utils/Constants'
import { ERC20 } from '../generated/Carbonmark/ERC20'
import { ERC1155 } from '../generated/Carbonmark/ERC1155'
import { Bytes, log } from '@graphprotocol/graph-ts'

export function handleListingCreated(event: ListingCreated): void {
  // Ensure the user entity exists
  loadOrCreateUser(event.params.account)
  loadOrCreateUser(event.transaction.from)
  let project = loadOrCreateProject(event.params.token)

  let listing = loadOrCreateListing(event.params.id.toHexString())

  let ERC20TokenContract = ERC20.bind(event.params.token)
  let ERC1155TokenContract = ERC1155.bind(event.params.token)

  let tokenSymbol = ERC20TokenContract.try_symbol()
  let interfaceID = ERC1155TokenContract.try_supportsInterface(Bytes.fromHexString('0xd9b67a26'))

  if (!tokenSymbol.reverted) {
    listing.tokenStandard = 'ERC20'
    listing.tokenSymbol = tokenSymbol.value
  } else if (!interfaceID.reverted) {
    listing.tokenStandard = 'ERC1155'
    listing.tokenSymbol = project.id
  } else {
    log.error('Token does not implement ERC20 or ERC1155', [])
  }

  listing.totalAmountToSell = event.params.amount
  listing.leftToSell = event.params.amount
  listing.tokenAddress = event.params.token
  listing.tokenId = event.params.tokenId
  listing.active = true
  listing.deleted = false
  listing.singleUnitPrice = event.params.price
  listing.expiration = event.params.deadline
  listing.minFillAmount = event.params.minFillAmount
  listing.project = project.id
  listing.seller = event.params.account
  listing.createdAt = event.block.timestamp
  listing.updatedAt = event.block.timestamp

  listing.save()

  let activity = loadOrCreateActivity(event.transaction.hash.toHexString().concat('ListingCreated'))
  activity.amount = event.params.amount
  activity.price = event.params.price
  activity.timeStamp = event.block.timestamp
  activity.activityType = 'CreatedListing'
  activity.project = listing.project
  activity.user = event.params.account
  activity.listing = listing.id
  activity.seller = event.params.account
  activity.save()
}

export function handleListingUpdated(event: ListingUpdated): void {
  // User should already exist from creating the listing.

  let listing = loadOrCreateListing(event.params.id.toHexString())
  let activity = loadOrCreateActivity(event.transaction.hash.toHexString().concat('ListingUpdated'))

  if (event.params.oldAmount != event.params.newAmount) {
    listing.totalAmountToSell = event.params.newAmount
    listing.leftToSell = event.params.newAmount
    listing.updatedAt = event.block.timestamp
    listing.expiration = event.params.newDeadline

    activity.activityType = 'UpdatedQuantity'
    activity.project = listing.project
    activity.user = event.transaction.from
    activity.previousAmount = event.params.oldAmount
    activity.amount = event.params.newAmount
    activity.timeStamp = event.block.timestamp
    activity.seller = listing.seller
    activity.save()
  }

  if (event.params.oldUnitPrice != event.params.newUnitPrice) {
    if (activity.seller != ZERO_ADDRESS) {
      activity = loadOrCreateActivity(event.transaction.hash.toHexString().concat('ListingUpdated2'))
    }

    listing.singleUnitPrice = event.params.newUnitPrice
    listing.updatedAt = event.block.timestamp
    listing.expiration = event.params.newDeadline

    activity.activityType = 'UpdatedPrice'
    activity.project = listing.project
    activity.user = event.transaction.from
    activity.price = event.params.newUnitPrice
    activity.previousPrice = event.params.oldUnitPrice
    activity.timeStamp = event.block.timestamp
    activity.seller = listing.seller
  }

  listing.save()
  activity.save()
}

export function handleListingFilled(event: ListingFilled): void {
  // Ensure the buyer user entity exists
  loadOrCreateUser(event.transaction.from)

  let listing = loadOrCreateListing(event.params.id.toHexString())
  let buyerActivty = loadOrCreateActivity(event.transaction.hash.toHexString().concat('Purchase'))
  let sellerActivity = loadOrCreateActivity(event.transaction.hash.toHexString().concat('Sold'))

  listing.leftToSell = listing.leftToSell.minus(event.params.amount)
  if (listing.leftToSell == ZERO_BI) {
    listing.active = false
  }
  listing.updatedAt = event.block.timestamp
  listing.save()

  buyerActivty.amount = event.params.amount
  buyerActivty.price = listing.singleUnitPrice
  buyerActivty.timeStamp = event.block.timestamp
  buyerActivty.activityType = 'Purchase'
  buyerActivty.project = listing.project
  buyerActivty.user = event.transaction.from
  buyerActivty.listing = listing.id
  buyerActivty.seller = listing.seller
  buyerActivty.buyer = event.transaction.from
  buyerActivty.save()

  sellerActivity.amount = event.params.amount
  sellerActivity.price = listing.singleUnitPrice
  sellerActivity.timeStamp = event.block.timestamp
  sellerActivity.activityType = 'Sold'
  sellerActivity.project = listing.project
  sellerActivity.user = event.params.account
  sellerActivity.listing = listing.id
  sellerActivity.seller = listing.seller
  sellerActivity.buyer = event.transaction.from
  sellerActivity.save()

  let purchase = loadOrCreatePurchase(event.transaction.hash)
  purchase.price = listing.singleUnitPrice
  purchase.amount = event.params.amount
  purchase.timeStamp = event.block.timestamp
  purchase.user = event.transaction.from
  purchase.listing = listing.id
  purchase.save()
}

export function handleListingCancelled(event: ListingCancelled): void {
  let listing = loadOrCreateListing(event.params.id.toHexString())

  listing.active = false
  listing.deleted = true
  listing.leftToSell = ZERO_BI
  listing.updatedAt = event.block.timestamp
  listing.save()

  let activity = loadOrCreateActivity(event.transaction.hash.toHexString().concat('DeletedListing'))
  activity.timeStamp = event.block.timestamp
  activity.activityType = 'DeletedListing'
  activity.project = listing.project
  activity.user = event.transaction.from
  activity.listing = listing.id
  activity.seller = listing.seller
  activity.save()
}
