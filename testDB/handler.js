const db = require('./database')
const tb = require('./table');
const log = console.log;

// db.createDB('A')
// db.useDB('A')

// db.createDB('B')
// db.showDB()
// db.dropDB('A')
// db.showDB()

let db_path = ''

const spaceParser = (str) =>{
    return str.replace(" ","")
}

const dbHandler = (str) =>{
    
    const parsed = str.match(/(db )|(create|use|drop|show)|( \w+)/gi)
    // log(parsed , parsed.length)
    
    switch(parsed[1]){
        case 'create':
            if(parsed.length != 3){
                log('잘못된 입력입니다. 다음과 같이 입력하세요. db craete [db name]')
            } else{
                db.create(spaceParser(parsed[2]))
            }
            break;

        case 'use':
            if(parsed.length != 3){
                log('잘못된 입력입니다. 다음과 같이 입력하세요. db use [db name]')
            } else{
                db_path = db.use(spaceParser(parsed[2]))
            }
            break;

        case 'drop':
            if(parsed.length != 3){
                log('잘못된 입력입니다. 다음과 같이 입력하세요. db drop [db name]')
            } else{
                db.drop(spaceParser(parsed[2]))
            }
            break;

        case 'show':
            if(parsed.length != 2){
                log('잘못된 입력입니다. 다음과 같이 입력하세요. db show')
            } else{
                db.show()
            }
            break;
        default :
            log('잘못된 입력입니다. 사용가능한 db 명령어 : db [create, use, drop, show]')
    }
}

const tbHandler = (str) =>{
    log('this is tb : ',str)
}

module.exports ={
    handler(str) {
        if(str.match(/^(db|tb)/gi)==null){
            log('잘못된 입력입니다. db 나 tb로 시작하는 명령어를 입력하세요.')
            return ;
        }

        const mode = str.match(/^(db|tb)/gi)[0]

        switch(mode){
            case 'db': // database
                dbHandler(str)
                break;
            case 'tb': // table
                tbHandler(str)
                break;
            default: // it's null
                break;
        }
    }
}