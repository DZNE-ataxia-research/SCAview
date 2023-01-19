# SCAview


## SETUP


#### MongoDB
Setup a mongoDB on the default port. See -> https://www.mongodb.com/docs/manual/administration/install-community/

```
use viewerDB;
db.createUser({user: "idsn", pwd: "viewer_pwd_123", roles: [{role: "readWrite", db: "viewerDB"}]});
```
If you want to choose a different user/password/db name you have to also adjust the settings.py file in backend/backend/viewer/

#### Frontend / React

Execute in the folder frontend/
```
npm i . 

```
Create a file .env.development as well as .env.production and add the line REACT_APP_API_URL=<HOST:PORT>/clinical-backend/api
or replace <HOST:PORT> with the URL where your backend is hosted. e.g. <HOST:PORT>=http://localhost:8000

#### RedisDB

Make sure a RedisDB is running on the default port. See -> https://redis.io/docs/getting-started/installation/


#### Backend

Install all packages in requirements.txt. The application was tested with python==3.8.13, however for other python versions you may have to adjust the requirements.

## RUN

#### Frontend 

In the folder frontend/ run the command 
```
npm run start

```
or 
```
PORT=<YOURPORT> npm run start
```
(if you want to run it on another port)

to run the development server. This is sufficeint to run the application on your local machine. If you want to host the application please use 
```
npm run build
```
and then serve the folder build/. 

#### Backend 

In the folder backend/backend/ run the command: 

```
sh start_backend.sh
```
This starts a development server on port 8000. You can adjust the start_backup.sh script to change the port. 
If you want to deploy the application to production please adjust the SCA_VIEW_PROD_URL option and in the settings.py file adjust DEBUG=False . There are multiple ways to deploy a django application but the most common one is by using gunicorn as the wsgi webserver. See -> https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/gunicorn/
