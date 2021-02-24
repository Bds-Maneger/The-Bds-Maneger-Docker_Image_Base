#!/bin/bash
if ! command -v docker &> /dev/null;then
    echo "Install docker"
    exit 23
fi
docker_image_name='thebdsmaneger/maneger'
docker_more_options='-P -v /tmp/bds:/home/bds ${1}'
docker pull ubuntu:latest
docker build . --tag ${docker_image_name}
echo "Run: \"docker run -ti --rm ${docker_more_options} ${docker_image_name}\""