const bds = require("/tmp/bds/index");
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

    if (process.env.BDS_VERSION == 'latest') var bds_download_version = bds.bds_latest
    else var bds_download_version = process.env.BDS_VERSION
    console.log(`downloading the version: ${bds_download_version}`)
    bds.version_Download(bds_download_version)
}, 2500);
