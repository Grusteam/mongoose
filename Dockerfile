
FROM node
ENV MONGO_BASE_PASSWORD=powermongo
ENV EXPRESS_PORT=80
COPY . /var/www/mongoose
WORKDIR /var/www/mongoose
RUN npm install

CMD ["node", "app.js", "&"]