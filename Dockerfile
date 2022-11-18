# build step

FROM node:16.15 as build
WORKDIR /usr/src/ngcash
COPY ./package*.json ./
COPY ./tsconfig*.json ./
COPY ./prisma ./prisma
RUN npm install
COPY . .
RUN npm run build

# run step

FROM node:16.15
WORKDIR /usr/src/ngcash
COPY ./package*.json ./
COPY ./prisma ./prisma
RUN npm install --only=production --ignore-scripts
RUN npm i -g bcrypt
RUN npm link bcrypt
COPY --from=build /usr/src/ngcash/dist ./dist