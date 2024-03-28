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

- Eslint check command:
"npm run lint"

- Build command:
"npm run build"

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
Joi (The most powerful schema description language and data validator for JavaScript.)
2. Install command: 
"npm i joi --save-dev"


- Template response framework:
1. Library
nunjacks
2. Install command: 
"npm i nunjacks --save"


- Code analyzer
1. Tool:
ESlint
2. ESlint settings file:
.eslintrc.json (settings)
.eslintignore (files/folders ignor)
3. Packages:
- "ESLint" - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
LinK - https://www.npmjs.com/package/eslint
4. Install command:
- install and configure ESLint - "npm init @eslint/config"
5. Eslint plugin for VSCode:
- In VSCode, open the extension browser with the button on the left. Search for eslint. Install the top result, called “ESLint”
6. ATTENTION - .eslintrc.json file is very sensitive to json format. In case of incorrect line (incorrect json format) all rules will be disabled.
7. VSC "PROBLEMS" tab on toggle panel display errors and warnings


- Typescript migration:
1. typescript compiler install command:
"npm install --save-dev typescript"
2. Add a simple tsconfig.json that set the options to compile to ES5 and use CommonJS modules.
3. To use tsconfig.json for the rest of this tutorial, invoke tsc without input files.
4. Usefull commands and libraries:
"npm i -D ts-node @types/node @types/express" - this packages contains type definitions for node and express
from "tsconfig,json => outDir" field  
"npm i ts-node-dev --save-dev" - It restarts target node process when any of required files changes (as standard node-dev) but shares Typescript compilation process between restarts.
"npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin" - Tooling which enables you to use TypeScript with ESLint. Adds TypeScript-specific linting rules to ESLint (Essential for TypeScript-based projects, ensuring type safety and adherence to best practices)
5. "tsc" - generate equalent files with .js extension in the folder 


API:
---------
## Get recent photo ##
- Request:
POST /rover/
- Request body example:
{
    "user_id": "user_id",
    "user_name": "user_name",
    "api_key": "any_key_api"
}

## Get rover form ##
- Request:
GET /rover/form

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