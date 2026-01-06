# Build Stage
FROM node:20-bookworm AS builder

WORKDIR /build

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# Run Stage
FROM nginx:1.25-alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /build/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]