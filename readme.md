
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
- Set config variables in "config/config.js" and "config/config.json" files (later ignore these)

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

### Postman Collection

- [Published Docs 25.04.2020](https://documenter.getpostman.com/view/1747137/SzfAzmvC?version=latest)

- [Static Link 25.04.2020](https://www.getpostman.com/collections/aa1a219f17b0e5211f2e)


### Resources

- https://stackoverflow.com/a/42500573/7574023
- https://stackoverflow.com/a/58745027/7574023

### TODOs

- Ignore "config/config.js" and "config/config.json" files
- Add and use config variable for "device_token"
