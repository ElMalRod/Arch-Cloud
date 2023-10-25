## Connect to conteiner

--sh
docker-compose exec CloudArchdb bash

## Connect with mongosh

--sh
mongosh "mongodb://root:root123@localhost:27017/?authMechanism=DEFAULT&tls=false"


--sh
show dbs
show collections

--sh
use ("cloudArch")

