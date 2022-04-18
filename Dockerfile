# download Long Term Support (LTS) version of Node.js
FROM node:lts-alpine 

# set working directory
WORKDIR /usr/src/app

# copy important folder and file to minimize docker size
COPY package.json /usr/src/app
COPY ./src /usr/src/app/src
COPY .env /usr/src/app
COPY index.js /usr/src/app

# install dependencies
RUN npm install

# The EXPOSE instruction does not actually publish the port. 
# It functions as a type of documentation
EXPOSE 3000

# run the app
CMD ["npm","run","start"]
