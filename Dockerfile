FROM mhart/alpine-node:16.4.2

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci

COPY client client
RUN (cd client && npm ci && npm run build && rm -rf src)

COPY server server
RUN (cd server && npm ci)

ENV NODE_ENV production
ENV PORT 3000

CMD ["node", "server/app.js"]

EXPOSE 3000
