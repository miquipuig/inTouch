FROM node
ENV NODE_ENV staging
RUN mkdir /myApp
WORKDIR /myApp
ADD package.json /myApp
RUN npm install
ADD . /myApp