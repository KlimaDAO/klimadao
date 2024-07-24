# amd64 version is necessary for Foundry
FROM --platform=linux/amd64 node:21-slim

# Use build arguments to specify the subgraph directory
ARG SUBGRAPH_DIR   

# Fail the build if SUBGRAPH_DIR is not provided
RUN if [ -z "$SUBGRAPH_DIR" ]; then echo "SUBGRAPH_DIR build argument is required" && exit 1; fi

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY ${SUBGRAPH_DIR}/package*.json ./${SUBGRAPH_DIR}/

# Copy the rest of the application code
COPY ${SUBGRAPH_DIR} ./${SUBGRAPH_DIR}

COPY lib /usr/src/app/lib

COPY makefile .

COPY .env .

COPY ./deploy_graph.sh .

# Install dependencies
RUN cd ${SUBGRAPH_DIR} && yarn

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
RUN chmod +x deploy_graph.sh