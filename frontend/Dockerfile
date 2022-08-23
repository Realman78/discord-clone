FROM node:16 as build
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
WORKDIR /app
COPY package.json /app

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . /app

RUN npm run build


FROM nginx:1.22.0 as run-stage

COPY --from=build /app/build /usr/share/nginx/html