FROM node:20-alpine

LABEL name="backend-artigianato_online"

WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8000
CMD ["npm", "run", "start"]
