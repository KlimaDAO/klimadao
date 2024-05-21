   # Use an official Node.js runtime as a parent image
   FROM node:21

   # Set the working directory
   WORKDIR /usr/src/app

   # Copy package.json and package-lock.json
   COPY package*.json ./

   # Install dependencies
   RUN yarn

   # Copy the rest of the application code
   COPY . .

   # Install gettext
   RUN apt-get update && apt-get install -y gettext

   # Copy the start script
   COPY start.sh .

   # Make the script executable
   RUN chmod +x start.sh

   # Expose the port the app runs on
   EXPOSE 8020

   # Define the command to run the application
   CMD ["./start.sh"]