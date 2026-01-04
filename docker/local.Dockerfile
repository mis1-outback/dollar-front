# Build Stage
FROM node:20-alpine AS builder

WORKDIR /build

COPY package*.json ./

RUN npm ci --silent

COPY . .

RUN npm run build

# Run Stage
FROM nginx:1.25-alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /build/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]