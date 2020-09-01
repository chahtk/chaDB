const fs = require("fs");

const log = console.log;

module.exports = {
  
    create(tname, fieldINFO){
        // fiedlINFO : column name, type(int,string)
        // ex ) tb create tablename2 (col1 int, col2 str, col3 int)
        
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
        log('select')
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