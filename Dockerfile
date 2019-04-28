#1. define from what image we want to build from
FROM node:10

#2. Create a directory to hold the application code inside the image, this will be the working directory for your application
WORKDIR /TODO-SERVER

#3. Install your app dependencies using the npm binary. A wildcard is used to ensure both package.json and package-lock.json are copied
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

CMD nodemon server.js
EXPOSE 3001