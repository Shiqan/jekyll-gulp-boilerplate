#!/bin/bash
imageName=jekyll
containerName=jekyll

rebuildImage=${1:-false}

if [ "$rebuildImage" = true ] ; then
    docker build -t $imageName ../.
fi

docker rm -f $containerName
docker run -d -p 3000:3000 --name $containerName $imageName