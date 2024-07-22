export const extractIpfsHash = (uri: string): string => {
  return uri.split('ipfs://')[1]
}
