const bds = require("/tmp/bds/index");
const fs = require("fs");
const path = require("path")
bds.kill()
setTimeout(() => {
    if (process.env.TELEGRAM_TOKEN !== 'null') bds.telegram_token_save(process.env.TELEGRAM_TOKEN);
    else console.log('Telegram bot disabled, bot token not informed')
    const configs = JSON.stringify({
        "description": process.env.DESCRIPTION,
        "name": process.env.WORLD_NAME,
        "gamemode": process.env.GAMEMODE,
        "difficulty": process.env.DIFFICULTY,
        "players": process.env.PLAYERS,
        "xbox": process.env.XBOX_ACCOUNT
         })
    bds.set_config(configs)

    const bds_software = ((fs.existsSync(path.join(bds.bds_dir_bedrock, "bedrock_server"))||fs.existsSync(bds.bds_dir_bedrock, "bedrock_server.exe"))||(fs.existsSync(bds.bds_dir_java, "server.jar")))
    if (bds_software){
        if (process.env.BDS_REINSTALL === "true"){
            if (process.env.BDS_VERSION == 'latest') var bds_download_version = bds.bds_latest
            else var bds_download_version = process.env.BDS_VERSION
            console.log(`downloading the version: ${bds_download_version}`)
            bds.version_Download(bds_download_version)
        }
    } else console.log("We will not reinstall the Minecraft Server")
    
}, 2500);
