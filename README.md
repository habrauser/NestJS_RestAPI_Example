<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

CRUD REST API service example for books and authors.

TypeORM + MongoDB

## Structure

Project using MongoDB as database.

## API

This API is accessible trough Authorization type API Key. 
To get response on requests indicate Authorization API key in your headers with key ``API_KEY`` and value which was indicated in app's ``.env`` file.

Swagger Docs: ```app-url.com/api/```

<b>Get all authors</b>

URL: ```app-url.com/api/author/all```

Method: ```GET```

<b>Find author by name</b>

URL: ```app-url.com/api/author/{:firstName}/{:lastName}```

Method: ```GET```

<b>Find author by id</b>

URL: ```app-url.com/api/author/{:id}```

Method: ```GET```

<b>Create author</b>

URL: ```app-url.com/api/author/create```

Method: ```POST```

Body example: ```{
                 "firstName": "FirstName",
                 "lastName": "LastName",
                 "birthday": "01.01.1970"
             }```

<b>Update authors data</b>

URL: ```app-url.com/api/author/{:id}/update```

Method: ```PUT```

Body example: ```{ "firstName": "updatedFirstName" }```

<b>Delete author</b>

URL: ```app-url.com/api/author/{:id}/delete```

Method: ```DELETE```
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
