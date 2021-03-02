console.log(`Working in the directory: ${process.cwd()}, with script path: ${__filename}`)
const bds = require("/tmp/bds/index");
const fs = require("fs")
const path = require("path")

function start(){
    console.log({
        "enable monitor": process.env.BDS_MONI,
        "api enable": process.env.ENABLE_BDS_API
    })
    
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
    console.log(tokens_path);
    var tokens = JSON.parse(fs.readFileSync(tokens_path, "utf8"))
    tokens = (tokens[0].token || undefined)
    if (tokens === undefined){
        bds.token_register()
    }
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
}

setTimeout(() => start(), 1500);