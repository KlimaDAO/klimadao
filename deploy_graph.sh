#!/bin/sh

# Check if all required arguments are provided
if [ $# -ne 4 ]; then
    echo "Usage: $0 <subgraph-name> <rpc-url> <graph-node-url> <ipfs-url>"
    exit 1
fi

SUBGRAPH_NAME=$1
RPC_URL=$2
GRAPH_NODE_URL=$3
IPFS_URL=$4

export SUBGRAPH_NAME
export RPC_URL
export GRAPH_NODE_URL
export IPFS_URL

# Query the Polygon service
response=$(curl -s -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' $RPC_URL)

echo "RPC Response $response"

# Parse and convert the result from hex to decimal
hex_result=$(echo $response | sed -n 's/.*"result":"0x\([^"]*\)".*/\1/p')
decimal_result=$(printf "%d" 0x$hex_result)

echo "Hex result: $hex_result"
echo "Decimal result: $decimal_result"

# Increment the block number by one
incremented_result=$((decimal_result + 1))
echo "Incremented result: $incremented_result"

export START_BLOCK=$incremented_result

echo "Substituting block number"
# Substitute environment variables in the JSON file
envsubst < $SUBGRAPH_NAME/networkConfig/localhost.json.template > $SUBGRAPH_NAME/networkConfig/localhost.json

echo "Deploying $SUBGRAPH_NAME"

cd $SUBGRAPH_NAME && yarn deploy
