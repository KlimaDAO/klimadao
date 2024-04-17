import "dotenv/config";
import { Ident, Vault } from "provide-js";

console.log("begin carbon offset");

//*******************//
// PRVD CONNECTIVITY //
//*******************//

var REFRESH_TOKEN = process.env.REFRESH_TOKEN;
var ORG_ID = process.env.ORG_ID;
var USER_ID = process.env.USER_ID;

var access_token_request = {};
access_token_request.organization_id = ORG_ID;
access_token_request.user_id = USER_ID;

//get the access token
const IDENT_PROXY = new Ident(REFRESH_TOKEN);
const ACCESS_TOKEN = await IDENT_PROXY.createToken(access_token_request);
//console.log('access token generated:' + ACCESS_TOKEN.accessToken)

//get the vault
const VAULT_PROXY = new Vault(ACCESS_TOKEN.accessToken);

const ECO_VAULTS = await VAULT_PROXY.fetchVaults();

var ECO_VAULT_ID = ECO_VAULTS.results[0].id;

//get the key ids ~ no private keys exposed!!
const ECO_VAULT_KEY_IDS = await VAULT_PROXY.fetchVaultKeys(ECO_VAULT_ID);

var ECO_WALLET = ECO_VAULT_KEY_IDS.results.filter(
  (vaultkeys) => vaultkeys.spec === "secp256k1"
);
const ECO_KEY_ID = ECO_WALLET[0].id;
const ECO_WALLET_ADDRESS = ECO_WALLET[0].address;

//*******************//
// RETIRE CARBON     //
//*******************//

var SOURCE_TOKEN = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"; //Polygon USDC.e
var POOL_TOKEN = "0x2f800db0fdb5223b3c3f354886d907a671414a7f"; // BCT - Polygon

// specific retirements
//var PROJECT_TOKEN = "0x04943c19896c776c78770429ec02c5384ee78292";

// setup the retirement request

var RETIREMENT_REQUEST_PARAMS = {};
RETIREMENT_REQUEST_PARAMS.network_id = "2fd61fde-5031-41f1-86b8-8a72e2945ead"; //PRVD stack chain id for Polygon
RETIREMENT_REQUEST_PARAMS.description =
  "Provide ECO - retirement via NodeJs script";
RETIREMENT_REQUEST_PARAMS.value = 0.01234; //Amount of carbon you wish to retire
RETIREMENT_REQUEST_PARAMS.source_token_contract_address = SOURCE_TOKEN;
RETIREMENT_REQUEST_PARAMS.pool_token_contract_address = POOL_TOKEN;
RETIREMENT_REQUEST_PARAMS.beneficiary_address = ECO_WALLET_ADDRESS;
RETIREMENT_REQUEST_PARAMS.beneficiary_name = "Provide ECO Test User";
RETIREMENT_REQUEST_PARAMS.retirement_message =
  "Provide ECO API - Node.js batch script example";

var bearertoken = "Bearer " + ACCESS_TOKEN.accessToken;
const RETIREMENT_REQUEST = await fetch(
  "https://api.providepayments.com/api/v1/eco/retire_carbon_requests",
  {
    method: "POST",
    headers: { Authorization: bearertoken, "Content-type": "application/json" },
    body: JSON.stringify(RETIREMENT_REQUEST_PARAMS),
  }
);

const RETIREMENT_REQ_DATA_RESP = await RETIREMENT_REQUEST.json();

const HASHED_MESSAGE = RETIREMENT_REQ_DATA_RESP.hashed_data;

// sign the transaction
const SIGNED_TXN = await VAULT_PROXY.signMessage(
  ECO_VAULT_ID,
  ECO_KEY_ID,
  HASHED_MESSAGE
);

// broadcast the transaction
var RETIREMENT_BROADCAST_PARAMS = {};
RETIREMENT_BROADCAST_PARAMS.data = RETIREMENT_REQ_DATA_RESP.data;
RETIREMENT_BROADCAST_PARAMS.request_id = RETIREMENT_REQ_DATA_RESP.id;
RETIREMENT_BROADCAST_PARAMS.signature = SIGNED_TXN.signature;
RETIREMENT_BROADCAST_PARAMS.signer = ECO_WALLET_ADDRESS;
console.log(JSON.stringify(RETIREMENT_REQUEST_PARAMS));

var retirement_req_url =
  "https://api.providepayments.com/api/v1/eco/retire_carbon_requests/" +
  RETIREMENT_REQ_DATA_RESP.id +
  "/retire";
console.log(retirement_req_url);
const RETIREMENT_BROADCAST = await fetch(retirement_req_url, {
  method: "POST",
  headers: { Authorization: bearertoken, "Content-type": "application/json" },
  body: JSON.stringify(RETIREMENT_BROADCAST_PARAMS),
});

const RETIREMENT_BROADCAST_RESP = await RETIREMENT_BROADCAST.json();
console.log(RETIREMENT_BROADCAST_RESP);

console.log("end carbon offset");
