# using node version 10
FROM node:10
# create directory  
WORKDIR /usr/src/mhcdemo
# copy and install dependencies
COPY package*.json yarn.lock ./
RUN yarn install

# Copy src code
COPY . .
COPY client/build/. client/build/.

# Expose port start application
EXPOSE 3000

CMD ["yarn", "start"]