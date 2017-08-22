# use alpine linux with node and yarn and the user "node"
FROM node:alpine

ENV NPM_CONFIG_LOGLEVEL warn

# avoid root, switch to the "node" user
USER node

# set the working directory to the user home
WORKDIR /home/node
# copy current ("./") directory into the working directory
ADD . /home/node

# install from package.json
RUN yarn

# classic express port
EXPOSE 3000
# run the startup script.
# if none is defined, $ yarn start defaults to $ node server.js
CMD [ "yarn", "start" ]
