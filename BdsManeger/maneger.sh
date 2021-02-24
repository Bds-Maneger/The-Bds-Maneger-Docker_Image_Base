#!/bin/bash
#
echo "change the variables before starting"
if ! command -v jq;then
    sudo apt install jq
fi
if ! [ -e ~/bds_docker.json ];then
echo "{
    \"volume_name\": \"bds-volume\",
    \"WORLD_NAME\": \"Bds\",
    \"DESCRIPTION\": \"Bds in docker\",
    \"PLAYER\": 13,
    \"VER\": \"latest\"
}" > ~/bds_docker.json
fi
volume_name="$(cat ~/bds_docker.json|jq .volume_name|sed 's|"||g')"
WORLD_NAME="$(cat ~/bds_docker.json|jq .WORLD_NAME|sed 's|"||g')"
DESCRIPTION="$(cat ~/bds_docker.json|jq .DESCRIPTION|sed 's|"||g')"
PLAYER="$(cat ~/bds_docker.json|jq .PLAYER|sed 's|"||g')"
VER="$(cat ~/bds_docker.json|jq .VER|sed 's|"||g')"


startdocker(){
    if ! docker volume ls|grep "${volume_name}"|awk '{print $2}'|grep -q "${volume_name}";then
        echo "Creating the volume ${volume_name}"
        docker volume create "${volume_name}"
    fi

    docker run --rm -d -v "${volume_name}:/home/bds" --name "${volume_name}" -p 19132:19132/udp -p 19133:19133/udp -p 1932:1932/tcp -p 28574:28574/tcp -e WORLD_NAME="${WORLD_NAME}" -e DESCRIPTION="${DESCRIPTION}" -e PLAYERS="${PLAYER}" -e BDS_VERSION="${VER}" sirherobrine23/bdsmaneger:latest
    echo "To see the log run: ${0} log"
}

stopdocker(){
    docker stop $(docker ps|grep "${volume_name}"|awk '{print $1}')
}

logdocker(){
    docker logs --tail 1000 -f $(docker ps|grep "${volume_name}"|head -1|awk '{print $1}')
}

if docker ps|grep -q ${volume_name};then
    bds_cocker_status="stop"
else
    bds_cocker_status="start"
fi
read -rp "
Commands:
start,
stop,
log.

Option: " -e -i "${bds_cocker_status}" LE

case ${LE} in
start)
    startdocker
;;
stop)
    stopdocker
;;
restart)
    stopdocker
    startdocker
;;
log)
    logdocker
;;
esac
