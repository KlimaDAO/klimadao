#!/bin/bash

# Start the server in the background
npm run start:test &

# Get the process ID of the server
server_pid=$!

# Wait for the server to be available
while ! curl -s http://localhost:3000 > /dev/null; do
  sleep 1
done

# Run the Newman tests
npx newman run postman_collection.json

# Store the exit code of the Newman tests
newman_exit_code=$?

# Stop the server
kill $server_pid

# Exit the script with the exit code of the Newman tests
exit $newman_exit_code