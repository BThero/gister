# Structure

Server-side code (Node.js, Express, MongoDB, etc) is located in `server` folder.
Client-side (Frontend) is located in `client` folder.

Client-side uses `Create React App` with some basic interface, features and libraries **(I still did not implement logout feature though :()**

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
