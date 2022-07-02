# Structure

Server-side code (Node.js, Express, MongoDB, etc) is located in `server` folder.
Client-side (Frontend) is located in `client` folder.

Client-side uses `Create React App` with some basic interface, features and libraries

Updates 02.07.22:

- Logout implemented on front-end side
- Application migrated to Typescript
- Tests are created and running

TODO:

- Migrate tests to Typescript as well
- Create Docker stuff
- Github CI/CD
- Deploy application

# Test users

You can freely register your own accounts, but for testing purposes there are some users I created:

- email: `admin`, password: `admin`
- email: `user`, password: `user`

# Launch the app

- Do `npm install` in both folders
- Copy `server/env-example.txt` to `server/.env` so that server-side code works.
- Go to `/server` and run `yarn dev`
- Go to `/client` and run `yarn start`
- If everything is OK, you should see a Login page

# Swagger

```
swagger: '2.0'
info:
  description: Documentation for my Markdown Gist project's api.
  version: 1.0.0
  title: Github Gist Clone
host: localhost:4000
basePath: /api
tags:
  - name: authentication
    description: Uses JWT tokens
  - name: gists
    description: Everything to manage your gists

schemes:
  - http
paths:
  /users:
    post:
      tags:
        - authentication
      summary: Register User
      description: ''
      operationId: registerUser
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: body
          name: body
          description: User data that needs to be sent
          required: true
          schema:
            $ref: '#/definitions/User'
      responses:
        '201':
          description: User Successfully Registered
        '400':
          description: Invalid input or user already exists

  /users/login:
    post:
      tags:
        - authentication
      summary: Login User
      description: ''
      operationId: loginUser
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: body
          name: body
          description: User data that needs to be sent
          required: true
          properties:
            email:
              type: string
            password:
              type: string

      responses:
        '200':
          description: User Successfully Logged In
        '400':
          description: Invalid input or invalid credentials

  /gists:
    get:
      tags:
        - gists
      summary: Get all user gists
      operationId: getUserGists
      responses:
        '200':
          description: Successful

    post:
      tags:
        - gists
      summary: Add a new gist
      description: ''
      operationId: setGist
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: body
          name: body
          description: Gist data that needs to be sent
          required: true
          properties:
            title:
              type: string
            content:
              type: string
            public:
              type: boolean

      responses:
        '200':
          description: Successfully created
        '400':
          description: Invalid input

  /gists/:id:
    put:
      tags:
        - gists
      summary: Update an existing gist
      description: ''
      operationId: updateGist
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: body
          name: body
          description: Gist data that needs to be sent
          required: true
          properties:
            title:
              type: string
              required: no
            content:
              type: string
              required: no
            public:
              type: boolean
              required: no
      responses:
        '200':
          description: Successfully updated
        '400':
          description: Gist not found
        '401':
          description: User not found or not authorized

    delete:
      tags:
        - gists
      summary: Delete an existing gist
      description: ''
      operationId: deleteGist
      produces:
        - application/json
      responses:
        '200':
          description: Successfully updated
        '400':
          description: Gist not found
        '401':
          description: User not found or not authorized

definitions:
  User:
    type: object
    properties:
      name:
        type: string
      email:
        type: string
      password:
        type: string

  Gist:
    type: object
    properties:
      title:
        type: string
      content:
        type: string
      public:
        type: boolean
      author:
        type: string
        description: name of author
      user:
        type: string
        description: id of author
```