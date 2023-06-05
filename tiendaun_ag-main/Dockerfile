FROM node:14

# Create app directory
WORKDIR /tiendaun_ag

# Install app dependencies
COPY package.json /tiendaun_ag/
RUN npm install

# Bundle app source
COPY . /tiendaun_ag/
# RUN npm run prepublish
EXPOSE 5000
CMD [ "npm", "run", "runServer" ]