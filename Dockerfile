FROM node:18.20.4-slim

RUN apt-get update && apt-get install -y python-is-python3
RUN npm install pm2 -g
RUN npm install typescript@latest -g
WORKDIR /app/
COPY . /app/
COPY public /app/public
    
RUN npm install && npm run build

RUN mkdir /app/dist/views
RUN mkdir /app/dist/uploads
COPY src/views/. /app/dist/views/

CMD ["pm2-runtime", "ecosystem.config.js"]