FROM node:16

EXPOSE 3215

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm install -g live-server

CMD ["live-server", "build", "--host=0.0.0.0", "--port=3215"]


