[![pipeline status](https://gitlab.com/gaetanGerard/netflix-clone-backend/badges/main/pipeline.svg)](https://gitlab.com/gaetanGerard/netflix-clone-backend/-/commits/main)[![coverage report](https://gitlab.com/gaetanGerard/netflix-clone-backend/badges/main/coverage.svg)](https://gitlab.com/gaetanGerard/netflix-clone-backend/-/commits/main)
# netflix-clone-backend

## Technos

- NodeJS / Express
- MongoDB
- Apollo GraphQL
- Docker

## How to start The server ?

1) Create a .env file

    The env file required those Variable for the server to work

   1.1) MONGODB_USER=${the user for connect to the DB}

   1.2) MONGODB_USER_PASSWORD=${the password for connect to the DB}

   1.3) MONGODB_CLUSTER=${the ID of the cluster}

   1.4) MONGODB_DB=${the DB to which you want to connect}

   1.5) PORT=${the used by the server}

   1.6) URL=${the url or ip you want to be used}

   1.7) TMDB_API_KEY=${Your TMDB API Key}

2) Two ways for start the server, the first one is with the command ```yarn/npm``` the other is with docker

   2.1) Start With ```yarn/npm```

    2.1.1) ``` cd netflix-clone-backend && yarn install  ``` or ``` cd netflix-clone-backend && npm install  ```

    2.1.2) ``` yarn start ``` or ``` npm start ```

    2.2) Start With ``` docker ```

    2.2.1) you can choose to do ``` docker pull gge2705/netflix-clone-backend ```

    2.2.2) and then ``` docker run -p 4000:4000 --env-file .env -d gge2705/netflix-clone-backend ```

    or

    2.2.3) You can build the image and then run it

    2.2.4) ``` docker build . -t <your username>/<name of your image> ```

    2.2.5) and then ``` docker run -p 4000:4000 --env-file .env -d gge2705/netflix-clone-backend ```

    2.2.6) app will be available on the address you give in the env file
