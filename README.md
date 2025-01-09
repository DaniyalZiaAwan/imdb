Steps to run the app locally.

- Create "imdb" database on local.
- Add .env file in backend with following keys and update DB_USER and DB_PASSWORD accordingly.
  - DB_NAME=imdb
  - DB_USER=root
  - DB_PASSWORD=password
  - DB_HOST=localhost

- Add .env file in frontend with following keys.
  - REACT_APP_API_KEY=http://localhost:3000/api/

- run "npm i" in backend and frontend folders install packages.
- run "npm run start" in both backend and frontend to start servers.
- Check out the app. 
