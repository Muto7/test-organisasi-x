FROM node:18-alpine

WORKDIR /app

COPY package*.json tsconfig.json .
RUN npm install

COPY . .

# jika sudah melakukan seeder matikan command kembali
RUN npx prisma generate && npm run build
# RUN npx prisma db push && npx prisma db seed


CMD ["node", "dist/index.js"]
EXPOSE 3000

