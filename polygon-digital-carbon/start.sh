#!/bin/sh

# Query the Polygon service
response=$(curl -s -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' http://polygon-fork:8545)

echo "RPC Response $response"

# Parse and convert the result from hex to decimal
hex_result=$(echo $response | sed -n 's/.*"result":"0x\([^"]*\)".*/\1/p')
decimal_result=$(printf "%d" 0x$hex_result)

echo "Hex result: $hex_result"
echo "Decimal result: $decimal_result"

export START_BLOCK=$decimal_result

echo "Substituting block number"
# Substitute environment variables in the JSON file
envsubst < networkConfig/localhost.json.template > networkConfig/localhost.json

echo "Deploying polygon-digital-carbon"
# Start your application
yarn deploy:docker