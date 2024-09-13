FROM node:18.20.4-slim

RUN npm install typescript -g && npm install typescript@latest -g && npm i -g nodemon
WORKDIR /app/
COPY package*.json /app/
COPY tsconfig.json /app/
RUN mkdir /app/dist/views
RUN mkdir /app/dist/uploads
COPY /app/src/views/* /app/dist/views     

RUN npm install

COPY src /app/src
COPY public /app/public
RUN tsc

CMD ["node", "-r", "./tracing.js", "./dist/index.js"]