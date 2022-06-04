declare module "@transak/transak-sdk" {
  export default class TransakSDK {
    constructor(params: {
      apiKey: string;
      environment: string;
      widgetHeight: string;
      widgetWidth: string;
      defaultCryptoCurrency: string;
      fiatCurrency: string;
      walletAddress: string;
    });
    init();
  }
}
