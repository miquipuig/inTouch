FROM node
ENV NODE_ENV staging
RUN mkdir /myApp
WORKDIR /myApp
EXPOSE  3000
ADD package.json /myApp
RUN npm install
ADD . /myApp
# Expose port
