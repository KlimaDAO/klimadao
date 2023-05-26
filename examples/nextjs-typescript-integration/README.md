# NextJS Example Integrations

This application demonstrates how easy it is to add carbon credit retirements (aka offsets) to any application.

In this demo webapp, 1 kilogram of carbon is retired every time the user clicks a button. The user can specify the carbon project to retire, and attach a retirement message and beneficiary name. Retirements are created in real-time at the current market rate, as determined by supply & demand in public carbon liquidity pools. All the project data, prices and retirements you see here are powered by public, open-source infrastructure.

**🏷️ COMING SOON:**

We will update this example to demonstrate how you can:

- [ ] Choose a specific listing from a seller on Carbonmark.com and retire it at a fixed price from your application.
- [ ] Pay for your carbon retirements with a credit card, powered by the Provide.services ECO API.

## Application Overview

This application contains a few interesting code snippets

### Fetch project details from carbonmark.com

Note: the carbonmark APIs used here are in beta and are expected to change.
https://github.com/KlimaDAO/klimadao/blob/staging/examples/nextjs-typescript-integration/utils/fetchProjectInfo.ts#L43

### Fetch real time carbon prices

Leverage the KlimaDAO Retirement Aggregator directly to fetch real time price information.
https://github.com/KlimaDAO/klimadao/blob/staging/examples/nextjs-typescript-integration/utils/fetchPoolPrice.ts

### Execute transactions directly, from a serverless function

Using NextJS Route Handlers, we create a [Vercel serverless function](https://vercel.com/docs/concepts/functions/serverless-functions/quickstart). The serverless function controls a wallet, which is used to execute the carbon retirement transactions.
https://github.com/KlimaDAO/klimadao/blob/staging/examples/nextjs-typescript-integration/app/api/retire/route.ts#L29

### Retire carbon using the Provide ECO API

**🏷️**COMING SOON
