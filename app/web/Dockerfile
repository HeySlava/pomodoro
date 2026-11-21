FROM node:18-slim

WORKDIR /app

COPY package.json yarn.lock ./

RUN --mount=type=cache,target=/root/.cache/yarn \
    yarn install --frozen-lockfile --non-interactive --cache-folder /root/.cache/yarn

COPY . .

EXPOSE 3000

CMD [ "yarn", "dev" ]
