# Specify the base image
FROM node:14

# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Node.js application dependencies
RUN npm install

# Copy the contents of the AdmissionService directory to the container
COPY AdmissionService/ /app/AdmissionService/

COPY ./Shared /app/Shared/

EXPOSE $PORT

# Command to start your Node.js application
CMD ["npm", "start"]