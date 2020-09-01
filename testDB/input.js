const handler = require('./handler')

const readline = require('readline')
rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

rl.on('line', (line) =>{
    if(line.length == 0) rl.close() // program 종료

    // 입력 : db|tb [명령어] 
    // ex) db create [db name]
    
    handler.handler(line)
}).on('close', () =>{
    process.exit()
})