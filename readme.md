
### About:

Back-end API for [X-Tech/app16-backend](https://github.com/X-TECH/app16-backend) with Node.JS implementation

### Requirements

- NPM with NodeJS (or Nginx server) installed
- MySQL installed

### Demo Test:

- Run following commands
```
$ git clone https://github.com/boolfalse/app16.git
$ cd app16/
```

- Create empty DB
- Create .env file inside of your project root folder, and define required variables as described in .env.example

- Run migrations (and seeds)
```
$ sequelize db:migrate
$ sequelize db:seed:all # NOT NEED
```

- Download dependencies
```
$ npm i
```

- Run the app (dev)
```
$ npm start
```

### Resources

https://stackoverflow.com/a/42500573/7574023
https://stackoverflow.com/a/58745027/7574023

