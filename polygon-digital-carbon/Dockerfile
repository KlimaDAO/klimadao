   # Use an official Node.js runtime as a parent image
   FROM node:21-slim

   # Set the working directory
   WORKDIR /usr/src/app

   # Copy package.json and package-lock.json
   COPY polygon-digital-carbon/package*.json ./

   COPY ../lib /usr/src/lib

   # Install dependencies
   RUN yarn

   # Copy the rest of the application code
   COPY polygon-digital-carbon .

   # Install gettext
   RUN apt-get update && apt-get install -y gettext

   # Make the script executable
   RUN chmod +x start.sh

   # Expose the port the app runs on
   EXPOSE 8020

   # Define the command to run the application
   CMD ["./start.sh"]