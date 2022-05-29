FROM node:14-alpine
RUN apk update
WORKDIR /usr/src/app

COPY package.json ./
# RUN apk add --no-cache git
# RUN npm cache clean --force
RUN yarn install

COPY . .
RUN rm -rf .env

COPY .env.dev .env

EXPOSE 1101
EXPOSE 1102
EXPOSE 1103
EXPOSE 1104
RUN chmod +x ./entrypoint.sh

# CMD npm run run:dev
ENTRYPOINT [ "/bin/sh", "./entrypoint.sh" ]
# CMD npm run start:prod