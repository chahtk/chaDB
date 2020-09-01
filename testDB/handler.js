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
// for test
db_path = 'C:/Users/82109/Documents/GitHub/chaDB/db/hi2/'

const spaceParser = (str) =>{
    return str.replace(" ","")
}

const dbHandler = (str) =>{

    const parsed = str.match(/(db )|(create|use|drop|show)|( \w+)/gi)
    // log(parsed , parsed.length)
    if(parsed==null){
        log('잘못된 입력입니다. 명령어를 입력해주세요.')
        return ;
    } else if(parsed.length==1){
        log('잘못된 입력입니다. 명령어를 입력해주세요.')
        return ;
    }
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

    // db use [dbname] first

    const parsed = str.match(/(tb )|(create|insert|select|update|delete|show|desc)|( \w+)|(\([\w, ]+\))/gi)
    // log(parsed)
    if(parsed==null){
        log('잘못된 입력입니다. 명령어를 입력해주세요.')
        return ;
    } else if(parsed.length==1){
        log('잘못된 입력입니다. 명령어를 입력해주세요.')
        return ;
    }
    
    switch(parsed[1]){
        // 각 명령어에 대한 자세한 사항은 table.js에
        case 'create':
            // ex : tb create tablename (col1 int1, col2 int2, col3 int3)
            if(parsed.length<3){
                log('잘못된 입력입니다. 다음과 같이 입력하세요. tb create [table name] (columns type,...]')
            } else{
                const path_create =db_path+parsed[2].replace(" ","")
                parsed.length == 3 ? tb.create(path_create,[]) : tb.create(path_create,parsed[3])
            }
            break;
        case 'insert':
            // ex : tb insert tablename (col1, col2) values(val1, val2)
            if(parsed.length==6){
                const path_tablename = db_path+parsed[2].replace(" ","")
                tb.insert(path_tablename,parsed[3],parsed[5])
            } else{
                log('잘못된 입력입니다. 다음과 같이 입력하세요. tb insert tblename (col1, col2) values(val1, val2)')
            }
            break;
    }
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