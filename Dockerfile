FROM node:18-alpine As development
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN yarn install
COPY --chown=node:node .. .
USER node

FROM node:18-alpine As build
WORKDIR /usr/src/app
ARG project
ENV project_name $project
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node .. .
ENV NODE_ENV production
RUN yarn run build $project
USER node

FROM node:18-alpine As production
ARG project
ENV project_name $project
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist/apps/$project ./dist
CMD [ "node", "dist/main.js" ]
