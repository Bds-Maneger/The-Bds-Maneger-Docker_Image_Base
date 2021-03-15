console.log(`Working in the directory: ${process.cwd()}, with script path: ${__filename}`)
const bds = require("/tmp/bds/index");
const {bds_dir} = require("/tmp/bds/index");
const fs = require("fs")
const path = require("path")
bds.api()
bds.api.log()
const bds_tokens = path.join(bds.bds_dir, "bds_tokens.json") 
if (fs.existsSync(bds_tokens)) console.log(fs.readFileSync(bds_tokens, "utf-8"))
else bds.token_register();

if (process.env.TELEGRAM_TOKEN !== "null") bds.telegram.launch()
else console.log(`Telegram bot Disabled because the token was not informed`)

function output(dados){
    var out = dados
    if (out.slice(-1) == "\n"){
        out = out.slice(0, -1)
    }
    console.log(out)
}
const tokens_path = path.join(bds.bds_dir, "bds_tokens.json")
const user_file_connected = path.join(bds_dir, "bds_users.json")
module.exports.players_files = user_file_connected
if (!(fs.existsSync(user_file_connected))) fs.writeFileSync(user_file_connected, "[]")
const file_user_check = fs.readFileSync(user_file_connected, "utf8");
const primeira_letra = file_user_check.charAt(0)
const ultima_letra = file_user_check.slice(-1)
if (primeira_letra !== "[") bds.token_register()
else if (ultima_letra !== "]") bds.token_register()
var bds_software
if (fs.existsSync(path.join(bds.bds_dir_bedrock, "bedrock_server"))) bds_software = true
else if (fs.existsSync(path.join(bds.bds_dir_bedrock, "bedrock_server.exe"))) bds_software = true
else if (fs.existsSync(path.join(bds.bds_dir_java, "server.jar"))) bds_software = true
else bds_software = false

if (bds_software){
    const server = bds.start()
    server.stdout.on("data", function (data) {output(data)});
    server.on("exit", function(code){
        output(`\n\n\nExit with code ${code}`);
        process.exit(code)
    })
} else new Error("The server was not installed correctly")