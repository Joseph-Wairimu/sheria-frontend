FROM node:20.11.1

WORKDIR /app  

COPY package*.json ./  

RUN npm i --legacy-peer-deps

COPY . .  

RUN npm run build  

EXPOSE 3000

CMD ["npm", "start"]  

