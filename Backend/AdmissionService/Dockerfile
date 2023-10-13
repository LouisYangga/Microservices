FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY AdmissionService/ /app/AdmissionService/

COPY ./Shared /app/Shared/

# COPY ./AdmissionService/config/config.js .
RUN node -e "const config = require('./AdmissionService/config/config'); console.log('PORT=' + config.port);" > .env
# Expose the port defined by the PORT environment variable
EXPOSE $PORT

CMD ["npm", "start"]
