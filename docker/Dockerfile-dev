FROM oven/bun:1 AS base
WORKDIR /app

ENV DOMAIN=dev.cream-dream.site

RUN apt-get update && apt-get install -y unzip

COPY package*.json ./

RUN bun install

COPY . .

EXPOSE 5173

ENTRYPOINT [ "bun" , "run" , "dev" ]

