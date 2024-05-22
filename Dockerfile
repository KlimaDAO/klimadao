   # amd64 version is necessary for Foundry
   FROM --platform=linux/amd64 node:21-slim

   # Set the working directory
   WORKDIR /usr/src/app

   # Copy package.json and package-lock.json
   COPY polygon-digital-carbon/package*.json ./

   COPY lib /usr/src/lib

   # Install dependencies
   RUN yarn

   # Copy the rest of the application code
   COPY polygon-digital-carbon .

   COPY makefile .

   COPY .env .

   # Install Foundry
   RUN apt-get update && \
      apt-get install -y curl git && \
      curl -L https://foundry.paradigm.xyz | bash && \
      /root/.foundry/bin/foundryup

   # Ensure cast is in the PATH
   ENV PATH="/root/.foundry/bin:${PATH}"

   # Install gettext & make
   RUN apt-get update && apt-get install -y gettext && apt-get install -y make

   # Make the script executable
   RUN chmod +x start.sh

   # Expose the port the app runs on
   EXPOSE 8020