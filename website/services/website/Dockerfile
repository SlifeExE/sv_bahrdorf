# Stage 1: Build React app
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependency manifests first for layer cache efficiency
COPY src/package.json src/package-lock.json* ./
RUN npm install

# Copy remaining source and build
COPY src/ .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine AS server

# Remove default nginx placeholder content
RUN rm -rf /usr/share/nginx/html/*

# Copy built static files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy SPA nginx config
COPY services/website/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
