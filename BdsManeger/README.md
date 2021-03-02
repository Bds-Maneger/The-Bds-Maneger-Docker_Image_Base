Start a minecraft bedrock server in a docker container.

# Basic command to start and expose the necessary ports

```bash
docker volume create bds-volume
docker run --rm -d -v bds-volume:/home/bds --name bds-server -p 19132:19132/udp -p 19133:19133/udp -p 1932:1932/tcp bdsmaneger/maneger:latest
```
----

## Attention

If there is no volume, every time you start the server there will be a new map with a new configuration.

it is recommended to download **manager.sh** at the root of the repository and modify the variables so that you do not need to execute several commands.

----

## basic server settings

DESCRIPTION: Server description

WORLD_NAME: Server Name

GAMEMODE: Server game mode

DIFFICULTY: Standard server difficulty

XBOX_ACCOUNT: if xbox account is required

PLAYERS: Number of Players

BDS_VERSION: server version, by default it will always be the last

----

## Example

```bash
docker run --rm -d -v bds-volume:/home/bds --name bds-server -p 19132:19132/udp -p 19133:19133/udp -p 1932:1932/tcp -e WORLD_NAME="BdsProject" -e DESCRIPTION="Bds maneger is the best manager" -e PLAYERS="13" bdsmaneger/maneger:latest
```

# Microsoft Azure Container

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FBds-Maneger%2FThe-Bds-Maneger-Docker%2Fmain%2Fazure%2FBdsMangerCore_docker.json) [![Visualize](https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/1-CONTRIBUTION-GUIDE/images/visualizebutton.svg?sanitize=true)](http://armviz.io/#/?load=https%3A%2F%2Fraw.githubusercontent.com%2FBds-Maneger%2FThe-Bds-Maneger-Docker%2Fmain%2Fazure%2FBdsMangerCore_docker.json)

**Recommended to use a new resource group**
