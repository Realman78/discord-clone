FROM node:16
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
WORKDIR /app
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . .

ENV PORT=5002
ENV MONGO_URI=mongodb+srv://admin:admin@discordcluster.lunpe.mongodb.net/DiscordDB?retryWrites=true&w=majority
ENV TOKEN_KEY=iWillTakeOverTheWorld

EXPOSE 5002

CMD [ "npm", "run", "server" ]