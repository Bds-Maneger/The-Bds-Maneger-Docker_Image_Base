#!/bin/bash
if [[ ${Docker_Debug_Script} == "true" ]]; then
    set -x
else
    echo "Debug mode Off"
fi

{
    git clone --depth=1 --recursive https://github.com/Bds-Maneger/bds_maneger_api.git /tmp/bds
    cd /tmp/bds
    npm install
    if [[ -d "/home/bds/.config/bds_maneger_api" ]];then
        echo "Bds Dir exist"
    else
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

if [[ -e /home/bds/bds_config.json ]]; then
    node /bds_files/setup_node.js
else
    if [[ ${BDS_REINSTALL} == "true" ]]; then
        node /bds_files/setup_node.js
    else
        echo "Skipping server installation"
    fi
fi
remove() {
    node -p "require(\"/tmp/bds/index\").kill()"
}
trap 'remove; exit 130' INT
trap 'remove; exit 143' TERM
BDS_MONI="true" ENABLE_BDS_API="true" node /bds_files/server_start.js &
wait $!
exit $?