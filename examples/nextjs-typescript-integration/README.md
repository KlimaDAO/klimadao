# NextJS Retirement Aggregator Integration

In this example we demonstrate how to add carbon offset retirements to a NextJS application.

In this demo application, 1 gram of carbon is offset every time the user clicks the "Offset Carbon" button. The user can also specify the carbon project to retire, and attach a retirement message and beneficiary name.

Retirements are created in real-time at the going market rate, plus a 1% network fee for the KlimaDAO Retirement Aggregator. This is an example of a 'self-service' approach, where the cost of the retirement is deducted from a wallet that is pre-funded with USDC (to pay for the retirements) and MATIC (to pay for the Polygon network transaction gas). It is up to the developer to ensure the wallet is funded, and handle failed transactions.

# Overview

1. When the user clicks 'submit', a POST is sent to a NextJS API route (a serverless function running on Vercel/AWS) with the retirement details.
2. The API route validates and authenticates the request.
3. Wallet credentials (`BIP39 Mnemonic` i.e. a "Seed Phrase") are exposed to the server runtime as an environment variable, and used to instantiate a wallet with Ethers.js.
4. Ethers.js signs the retirement transaction and broadcasts it to the Polygon network.
5. When the transaction is completed, Carbonmark generates a retirement certificate page which can be shared with the user.
