const fs = require("fs");

const log = console.log;

module.exports = {
  
    create(tname, fieldINFO){
        // fiedlINFO : column name, type(int,string)
        // ex ) tb create tablename2 (col1 int, col2 str, col3 int)
        // ex : tb insert tablename2 (email, pass) values(asd@hi, weq231)

        const obj = {};
        
        // log(fieldINFO);
        try{
            const parsed = fieldINFO.split(', ').map( v => v.replace(/[\(\)]/g,""));
            // log(parsed);
    
            const desc = {};
            parsed.map( v => {
                const [col,type] = v.split(' ');
                desc[col] = type;
            })
            obj['desc'] = desc;
    
            // console.dir(obj, {depth:null})
        } catch(err) { console.error(err) }

        const field = JSON.stringify(obj)
        // log(tname)
        fs.writeFileSync(`${tname}.json`, field, (err) =>{
            if(err) {
                console.error(err)
                throw err;
            }
        })
        log(`create '${tname}' table. fildeINFO : ${field}`)
    },

    insert(tname, cols, vals){
        // tb insert tablename2 (col1, col2) values(val1, val2)
        // key : va1(사실상 col1가 primarykey)로 한다.
        // ex ) 이메일주소, 비밀번호, 성, 이름... (이메일주소가 키값)
        log(`insert argument : ${tname} , ${cols} , ${vals}` , typeof tname)

        try{
            const parsed_cols = cols.split(", ").map( v => v.match(/\w+/g));
            const parsed_vals = vals.replace("values","").split(", ").map(v=>v.match(/[\w!@#$%^&*-=]+/g)[0])

            const data = {}
            for(let i=0; i<parsed_cols.length; i++){
                data[parsed_cols[i]] = parsed_vals[i]
            }

            const file = require(tname)
            file[parsed_vals[0]] = data
            log(file)

            const toJson = JSON.stringify(file)
            fs.writeFileSync(`${tname}.json`, toJson, (err) =>{
                if(err){
                    console.error(err);
                    throw err;
                }
            })
            log(`insert into '${tname}' table, data : ${toJson}`)
        } catch(err) { console.error(err)}
    },

    select(cols, tname, where){ // where : obj
        // tb select (col1, col2) from tablename2 where(col1=val1, col2=val2)
        // tb select (col1, col2) from tablename2 where(col1=asd@hi, col2=weq231)

        
            /* chaDB/db/hi2/tablename2.json
            {
                "test@test.com":{"col1":"test@test.com","col2":"testpass!"},
                "asd@hi":{"col1":"asd@hi","col2":"weq231"}
            }
            */

            
        log(`select : ${cols}, ${tname}, ${where}`)

        // parsing : cols, where , filename : tname
        const parsed_cols = cols.split(",").map(v=>v.match(/\w+/g)[0] )
        const parsed_where = where.split(",").map(v=>{
            const [col,val] = v.match(/[\w!@#$%^&*-.]+/g)
            // log(col,val)
            const obj = {};
            obj[col]=val;
            return obj;
        })
        // log(parsed_cols, parsed_where)
  
        const tableName = require(tname+'.json')
        // log(tableName)

        // table의 모든 키를 가져온다.
        // 그 키들로 전부 검색을 하는데, 그 키의 값은 객체다. (타겟 키, 객체)
        // 그 객체에서 조건을 모두 만족하는지 판단하고, 만족하면 타겟 키를 리턴한다.
        // 타겟키에서 parsed_cols의 값들을 최종적으로 리턴한다.
        const result = []
        const targetkey_list = Object.keys(tableName).slice(1) // 0은 desc용
        // log(targetkey_list)

        // 테이블의 값들을 탐색( targetkey_list : 이메일주소와 같은 primarykey)
        targetkey_list.map( targetkey=>{
            // 키를 이용해 테이블 값에 접근
            const targetObj = tableName[targetkey];
            // log(targetkey, targetObj)
            let flag = 0;

            // 조건 탐색
            parsed_where.map( v =>{
                // v = {key:val}
                const key = Object.keys(v)[0]
                const val = Object.values(v)[0]
                
                try{
                    if(targetObj[key] == val){ // 조건 하나 만족!
                        flag++;
                    }
                } catch {}
            })
            // tb select (col1, col2) from tablename2 where(col1=asd@hi, col2=weq231)
            // 조건을 모두 만족 했음!
            // log(flag == parsed_where.length)
            if(flag == parsed_where.length){
                parsed_cols.map( key =>{
                    result.push(targetObj[key])
                })
            }
          
        })
        // log('select result ===>  ',result)
        return result
    },

    update(tname, set, where){ // set, where : obj
        log('update table')
    },
    
    delete(tname){ // delete table name
        // tb delete tablename3.json
        try{
            fs.unlinkSync(tname+'.json')
        } catch(e) { console.error(e)}
        log('delete ',tname)
    },

    show(path){ // ls
        // tb show ( use db first)
        const tableLIST = fs.readdirSync(path)
        console.log(tableLIST)
    },

    desc(tname){
        // tb desc table
        const file = require(tname)
        log("desc ===> ", file.desc)
    },

}