#!/bin/bash
if [[ ${Docker_Debug_Script} == "true" ]]; then
    set -x
else
    echo "Debug mode Off"
fi

{
    git clone --depth=1 --recursive https://github.com/The-Bds-Maneger/core.git /tmp/bds
    cd /tmp/bds
    npm install
    if ! [[ -d "/home/bds/.config/bds_maneger_api" ]];then
        mkdir -p "/home/bds/.config/bds_maneger_api"
    fi
} || {
    echo "We had some error coming out with code 23"
    exit 23
}

if [[ ${HOME} != "/home/bds/" ]]; then
    echo "Old home: ${HOME}"
    export HOME="/home/bds/"
    echo "New home: ${HOME}"
fi
node /bds_files/setup_node.js
echo "Setup completed"
remove() {
    while true
    do
        if [[ $(curl http://localhost:1932/info|jq '.running'|sed 's|"||g') == "true" ]];then
            curl -X post -h "token=\"$(node -p "require('/home/bds/bds_tokens.json')[0].token")\"&command=stop" http://localhost:1932/service
        else
            break
        fi
        sleep 30s
    done
    exit 0
}
trap 'remove; exit 130' INT
trap 'remove; exit 143' TERM
BDS_MONI="true" ENABLE_BDS_API="true" node /bds_files/server_start.js &
wait $!
exit $?