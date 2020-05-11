FROM node:12.14-alpine

RUN apk update && apk upgrade && \
  apk add --no-cache bash coreutils

WORKDIR /app

COPY package.json ./

RUN npm i --quiet

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start" ]
