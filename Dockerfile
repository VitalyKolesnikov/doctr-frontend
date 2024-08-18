FROM --platform=linux/amd64 node:16.10.0-alpine3.14 as build

WORKDIR /app
COPY . .
ENV REACT_APP_API_HOST='http://backend'
RUN rm -rf node_modules && yarn
RUN npx update-browserslist-db@latest
RUN yarn run build

FROM nginx:stable-alpine

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=build /app/build /usr/share/nginx/html/

EXPOSE 80
