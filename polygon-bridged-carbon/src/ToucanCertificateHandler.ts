import { Transfer } from '../generated/ToucanCertificate/ToucanCertificate'
import { loadKlimaRetire } from './utils/KlimaRetire'
import { loadOrCreateToucanCertificate } from './utils/ToucanCertificate'
import { loadOrCreateTransaction } from './utils/Transactions'

export function handleToucanCertificateTransfer(event: Transfer): void {
  let transaction = loadOrCreateTransaction(event.transaction, event.block)
  let klimaRetire = loadKlimaRetire(transaction)
  let toucanCertificate = loadOrCreateToucanCertificate(transaction)

  toucanCertificate.tokenID = event.params.tokenId

  //If the NFT Transfer event happens after the ToucanRetired event that stores KlimaRetire entity
  if (klimaRetire != null) {
    klimaRetire.certificateTokenID = event.params.tokenId
    toucanCertificate.klimaRetire = klimaRetire.id

    klimaRetire.save()
  }

  toucanCertificate.save()
}
