FROM node:alpine
WORKDIR /usr/cash-control/client
EXPOSE 3000
COPY ./ ./
RUN yarn install
CMD ["yarn", "run", "start"]
