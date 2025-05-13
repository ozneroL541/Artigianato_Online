FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
LABEL name="ao-frontend"
CMD ["npm", "run", "start"]
