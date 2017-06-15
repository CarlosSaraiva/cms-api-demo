FROM node:8.1.0

ENV APP_NAME=cms-api-demo
ENV APP_USER=dev
ENV USER_HOME=/home/$APP_USER
ENV APP_HOME=$USER_HOME/$APP_NAME

RUN useradd --user-group --create-home --shell /bin/false $APP_USER

COPY package.json $APP_HOME/
RUN chown -R $APP_USER:$APP_USER $USER_HOME/*

USER $APP_USER
WORKDIR $APP_HOME
RUN npm install

USER root
COPY . $APP_HOME
RUN chown -R $APP_USER:$APP_USER $USER_HOME/*
USER $APP_USER
CMD ["node", "app.js"]
