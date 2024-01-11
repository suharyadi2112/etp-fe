FROM node:20.10.0-alpine AS feimage

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install
RUN npm install @vue/cli@3.7.0 -g
COPY . /app
RUN npm run build

FROM nginx:1.23-alpine
COPY --from=feimage /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
