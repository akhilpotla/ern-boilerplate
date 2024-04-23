#!/bin/bash


docker compose -f docker_compose.yml down

docker rm $(docker ps -a -f status=exited -q)
docker rmi $(docker images -a)
docker volume rm $(docker volume ls -q)
docker system prune -a --volumes
