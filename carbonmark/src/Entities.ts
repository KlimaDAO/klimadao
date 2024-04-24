import { Activity, Category, Country, Listing, Project, Purchase, User } from '../generated/schema'
import { ZERO_BI } from '../../lib/utils/Decimals'
import { ZERO_ADDRESS } from '../../lib/utils/Constants'
import { Address, BigInt, Bytes, log } from '@graphprotocol/graph-ts'
import { PROJECT_INFO } from './Projects'

export function loadOrCreateProject(token: Address, tokenId: BigInt): Project {
  // Find the project + vintage ID from token address
  let tokenAddress = token.toHexString()
  let id = ''
  let registry = ''
  let projectIndex = 0
  for (let i = 0; i < PROJECT_INFO.length; i++) {
    if (tokenAddress.toLowerCase() == PROJECT_INFO[i].address && tokenId.toString() == PROJECT_INFO[i].tokenId) {
      id = PROJECT_INFO[i].projectId + '-' + PROJECT_INFO[i].vintage
      registry = PROJECT_INFO[i].projectId.split('-')[0]
      projectIndex = i
      break
    }
  }

  let project = Project.load(id)

  if (project == null) {
    project = new Project(id)
    project.key = PROJECT_INFO[projectIndex].projectId
    project.name = PROJECT_INFO[projectIndex].name
    project.methodology = PROJECT_INFO[projectIndex].methodology
    project.vintage = BigInt.fromString(PROJECT_INFO[projectIndex].vintage)
    project.projectAddress = token
    project.registry = registry
    project.category = PROJECT_INFO[projectIndex].category
    project.country = PROJECT_INFO[projectIndex].country
    project.tokenId = tokenId
    project.isExAnte = PROJECT_INFO[projectIndex].isExAnte
    project.save()

    createCountry(project.country)
    createCategory(project.category)
  }
  return project
}

export function loadOrCreateUser(id: Address): User {
  let user = User.load(id)
  if (user == null) {
    user = new User(id)
    user.save()
  }
  return user
}

export function loadOrCreateListing(id: string): Listing {
  let listing = Listing.load(id)
  if (listing == null) {
    listing = new Listing(id)
    listing.totalAmountToSell = ZERO_BI
    listing.leftToSell = ZERO_BI
    listing.tokenAddress = ZERO_ADDRESS
    listing.tokenId = ZERO_BI
    listing.active = false
    listing.deleted = false
    listing.batches = [ZERO_BI]
    listing.batchPrices = [ZERO_BI]
    listing.singleUnitPrice = ZERO_BI
    listing.expiration = ZERO_BI
    listing.minFillAmount = ZERO_BI
    listing.project = ''
    listing.seller = ZERO_ADDRESS
    listing.createdAt = ZERO_BI
    listing.updatedAt = ZERO_BI
    listing.tokenSymbol = ''
    listing.tokenStandard = ''
    listing.save()
  }
  return listing
}

export function loadOrCreateActivity(id: string): Activity {
  let activity = Activity.load(id)
  if (activity == null) {
    activity = new Activity(id)
    activity.activityType = 'CreatedListing'
    activity.user = ZERO_ADDRESS
    activity.project = ''
    activity.seller = ZERO_ADDRESS
    activity.save()
  }
  return activity
}

export function loadOrCreatePurchase(id: Bytes): Purchase {
  let purchase = Purchase.load(id)
  if (purchase == null) {
    purchase = new Purchase(id)
    purchase.price = ZERO_BI
    purchase.amount = ZERO_BI
    purchase.timeStamp = ZERO_BI
    purchase.user = ZERO_ADDRESS
    purchase.listing = ''
    purchase.save()
  }
  return purchase
}

export function loadProject(projectId: string): Project {
  let project = Project.load(projectId)
  if (project == null) {
    throw new Error('Project does not exist')
  }
  return project
}

function createCountry(id: string): void {
  let country = Country.load(id)
  if (country == null) {
    country = new Country(id)
    country.save()
  }
}

function createCategory(id: string): void {
  let category = Category.load(id)
  if (category == null) {
    category = new Category(id)
    category.save()
  }
}
