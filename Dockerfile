FROM node:16.10.0-alpine3.14 as build

WORKDIR /app
COPY . .
RUN rm -rf node_modules && yarn
RUN npx update-browserslist-db@latest
RUN yarn run build

FROM nginx:stable-alpine

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
RUN mkdir -p /etc/letsencrypt/live/doctr.space
COPY --from=build /app/build /usr/share/nginx/html/

EXPOSE 80
EXPOSE 443
