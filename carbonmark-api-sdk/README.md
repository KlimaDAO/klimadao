# Carbonmark API SDK

## Description
The Carbonmark API SDK is a generated SDK to allow interaction with the Carbonmark API.
It uses the version defined in the package.json to fetch the relative openapi schema from the deployed API version and then generates: 

 - Clients -> Basic utilities to interact with each endpoint
 - Hooks -> A collection of SWR hooks wrapping the above clients
 - Models -> Typescript types for the api response objects
 - 

## Version
The current version of the SDK is 2.0.0-7.

## Installation
To install the SDK, you can use npm:

```bash
npm install carbonmark-api-sdk
```


## Usage
You can import the SDK into your project like this:

```ts
const carbonmarkApiSdk ('carbonmark-api-sdk');
```

Then, you can use the SDK's functions to interact with the Carbonmark API.

## Scripts
The package.json file includes the following scripts:

- `generate`: This script fetches the schema from the deployed API version and generates the SDK.
- `build`: This script runs `tsc` to build the SDK.
