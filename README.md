Steps to run the app locally.

1- Create "imdb" database on local.
2- Add .env file in backend with following keys and update DB_USER and DB_PASSWORD accordingly.

DB_NAME=imdb
DB_USER=root
DB_PASSWORD=password
DB_HOST=localhost

3- Add .env file in frontend with following keys.

REACT_APP_API_KEY=http://localhost:3000/api/

4- run "npm i" in backend and frontend folders install packages
5- run "npm run start" in both backend and frontend to start servers.
6- Check out the app. 
