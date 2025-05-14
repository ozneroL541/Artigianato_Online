FROM node:20-alpine

LABEL name="frontend-artigianato_online"

WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm", "run", "start"]
