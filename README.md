- Project description:
Proxy server for NASA API

- NASA base url:
https://api.nasa.gov/

- NASA Meteors url:
https://api.nasa.gov/neo/rest/v1/feed

- NASA Curiosity rover photos url:
https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos

- NASA Curiosity rover manifest url:
https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity

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

- date-nfs library:
1. link: 
https://date-fns.org/
2. install command:
"npm i date-fns --save"

- Express framework install command:
"npm i express --save"

- Https client:
1. library:
Axios
2. Install command: 
"npm i axios --save"

- Code validation library
1. Library
Joi
2. Install command: 
"npm i joi --save"

- Template response framework:
1. Library
nunjacks
2. Install command: 
"npm i nunjacks --save"

- Code analyzer
1. Tool:
ESlint
2. ESlint settings file:
.eslintrc.json
3. Packages:
- "ESLint" - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
LinK - https://www.npmjs.com/package/eslint
- "eslint-config-airbnb-base" - this package provides Airbnb's base JS .eslintrc (without React plugins) as an extensible shared config.
Link - https://www.npmjs.com/package/eslint-config-airbnb-base
4. Install command:
- install and configure ESLint - "npm init @eslint/config"
- install eslint-config-airbnb-base - "npm install --save-dev eslint-config-airbnb-base"

API:
---------
## Get recent photo ##
- Request:
POST /rover/
- Request body example:
{
    "user_id": "user id",
    "user_name": "user name",
    "api_key": "any key api"
}

## Get meteors ##
- Request:
GET /meteors/
- Request params:
start_date (format: yyyy-MM-dd)
end_date (format: yyyy-MM-dd)
count
were_dangerous (value: true)
- Request example:
http://localhost:4000/meteors?start_date=2024-03-13&end_date=2024-03-14&count=1&were_dangerous=true

## Get rover request params ##
- Request:
GET /meteors/
- Request params:
user_id
user_name
api_key
- Request example:
http://localhost:4000/rover?user_id=testId&user_name=testName&api_key=testApiKey
---------