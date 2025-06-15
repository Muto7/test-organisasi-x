# Stage 1: Build aplikasi Vite (React)
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve dengan Nginx
FROM nginx:alpine

# 🔥 Ini akan berhasil karena kita sudah buat stage bernama `build`
COPY --from=build /app/dist /usr/share/nginx/html

# Salin konfigurasi nginx jika kamu punya
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# ✅ Fix typo: daemon (bukan deamon)
CMD ["nginx", "-g", "daemon off;"]
