FROM node:16.10.0-alpine3.14 as builder
WORKDIR /app
COPY . .
ENV REACT_APP_API_HOST='http://localhost:8080'
RUN rm -rf node_modules && yarn
RUN yarn run build

FROM nginx:1.21.5-alpine
COPY --chown=nginx:nginx nginx-ui.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx --from=builder /app/build /var/www/html/