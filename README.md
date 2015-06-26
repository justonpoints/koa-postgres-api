# koa-neo4j-postgres-api
Koa Postgres passport starter files

install : node (nodejs.org), postgres

1. git clone https://github.com/justonpoints/koa-postgres-api
2. npm install (in the root of the app)
3. Add Postgres credentials : Currently in /lib/postgres
4. node --harmony index.js (in the root of the app, --harmony required since we are using generators)

5. Login to the app
http://localhost:1337/api/login?username=foo&password=bar 

6. Make a sample query
see /lib/api

Plans: 

1. To flush this out further.
2. Continue to explore the organzational theory being approached here.
	- All dependencies declared in the index.js. Dependencies are not declared in the lib files.
	- All middleware components refrenced in the /lib/lib.js file. Each instaces take at least an app depedency for the koa app.
3. Make using the db more streamlined
4. Look into an orm service.
