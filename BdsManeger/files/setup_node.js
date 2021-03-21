const bds = require("/tmp/bds/index");
const fs = require("fs");
const path = require("path")
bds.kill()

if (process.env.TELEGRAM_TOKEN !== 'null') bds.telegram_token_save(process.env.TELEGRAM_TOKEN);
else console.log('Telegram bot disabled, bot token not informed')

bds.set_config(JSON.stringify({
    "description": process.env.DESCRIPTION,
    "name": process.env.WORLD_NAME,
    "gamemode": process.env.GAMEMODE,
    "difficulty": process.env.DIFFICULTY,
    "players": process.env.PLAYERS,
    "xbox": process.env.XBOX_ACCOUNT
}))

var bds_software
if (fs.existsSync(path.join(bds.bds_dir_bedrock, "bedrock_server"))) bds_software = true
else if (fs.existsSync(path.join(bds.bds_dir_bedrock, "bedrock_server.exe"))) bds_software = true
else if (fs.existsSync(path.join(bds.bds_dir_java, "server.jar"))) bds_software = true
else bds_software = false
console.log("Server detetect:", bds_software)
if (bds_software){
    if (process.env.BDS_REINSTALL === "true") bds.download(process.env.BDS_VERSION)
    else console.log("Skipping reinstallation")
} else bds.download(process.env.BDS_VERSION)
