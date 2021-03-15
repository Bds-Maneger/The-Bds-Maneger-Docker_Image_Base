FROM bdsmaneger/node_image:latest
USER root
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && \
apt install -y git curl wget qemu-user-static binfmt-support jq sudo && \
rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/* /tmp/*

EXPOSE 1932/tcp 6565/tcp 19132/udp 19133/udp
RUN mkdir -p /home/bds/ /bds_files
COPY files/. /bds_files/
RUN chmod 777 /bds_files/init.sh && \
chmod +x /bds_files/init.sh
ENV TELEGRAM_TOKEN="null" \
DESCRIPTION="running Minecraft Bedrock Server on the docker by Bds Manager" \
WORLD_NAME="Bds Maneger Docker" \
GAMEMODE="survival" \
DIFFICULTY="normal" \
XBOX_ACCOUNT="false" \
PLAYERS="23" \
BDS_VERSION="latest" \
SERVER="bedrock" \
BDS_REINSTALL=false \
Docker_Debug_Script=false
ENV BDS_DOCKER_IMAGE=true HOME="/home/bds/"
RUN chmod 7777 -R /home/bds/
WORKDIR /home/bds/
ENTRYPOINT ["/bds_files/init.sh"]
