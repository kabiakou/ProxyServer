- Project description:
Proxy server for NASA API

- NASA API url:
https://api.nasa.gov/

- NASA Asteroids url:
https://api.nasa.gov/neo/rest/v1/feed

- Start server command:
"npm run start_server"

- Environment
1. Environment management:
added "--env-file .env" to start_server script in package.json
2. Useful link:
https://www.youtube.com/watch?v=T_OlUb5YwaU
3. Alternative:
use "dotenv" dependency module
link: https://www.npmjs.com/package/dotenv
4. Env variables example file:
see ".env.example" file

- Moment.js library:
1. link: 
https://momentjs.com/
2. moment().day() method:
https://www.geeksforgeeks.org/moment-js-moment-day-method/

- Express framework install command:
"npm instal express --save"

- Https client:
1. library:
Axios
2. Install command: 
"npm install axios --save"

- Automatically server reloading:
1. Module:
nodemon
2. Install command
"npm install nodemon --save"
3. Start server command:
"nodemon --env-file .env ./js/controller/AsteroidController.js"
4. Manual resrarting command:
"rs" and hit "ENTER"
