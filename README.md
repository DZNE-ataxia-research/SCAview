# SCAview


## SETUP


#### MongoDB

```
use viewerDB;
db.createUser({user: "idsn", pwd: "viewer_pwd_123", roles: [{role: "readWrite", db: "viewerDB"}]});
```

## RUN