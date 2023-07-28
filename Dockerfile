FROM node:14-alpine as builder

# Switch to rootless user node (included in the node image)
USER node

# Workdir
RUN mkdir -p /home/node/coding_school && chown -R node:node /home/node/coding_school
RUN mkdir -p /home/node/coding_school/build && chown -R node:node /home/node/coding_school/build
WORKDIR /home/node/coding_school

COPY ./package*.json ./

RUN npm install
COPY --chown=node:node ./ ./

COPY ./ .