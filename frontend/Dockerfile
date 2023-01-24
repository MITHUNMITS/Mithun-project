FROM node:14.17.4-alpine AS builder
COPY . /frontend
WORKDIR /frontend
RUN npm i
RUN npm run build --production

FROM nginx:1.15.8-alpine
COPY --from=builder /frontend/dist/frontend /usr/share/nginx/html

EXPOSE 9600