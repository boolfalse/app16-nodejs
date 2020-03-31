
### About:

Back-end API for [X-Tech/app16-backend](https://github.com/X-TECH/app16-backend) with Node.JS implementation

### Requirements

- NPM with NodeJS (or Nginx server) installed
- PostgreSQL installed

### Demo Test:

- Run following commands
```shell
$ git clone https://github.com/boolfalse/app16-nodejs.git
$ cd app16-nodejs/
$ npm i
```
- Create empty DB

- Create .env file inside of your project root folder, and define required variables as described in .env.example

- Run migrations and seeds
```
$ sequelize db:migrate
$ sequelize db:seed:all
```

- Run the app (dev)
```
$ npm start
```
