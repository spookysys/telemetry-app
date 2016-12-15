docker ps -qa | xargs docker rm --force
docker images -qa | xargs docker rmi --force